import { DMMF } from '@prisma/generator-helper'
/**
 * Purpose of this is class is this:
 * model User {
 *   id    Int     @id @default(autoincrement())
 *   email String  @unique
 *   name  String?
 *   ${camelCaseName} Dependente[]
 * }
 *
 * Given this class
 *
 * import {
 *   Injectable,
 *   InternalServerErrorException,
 *   NotFoundException,
 * } from '@nestjs/common'
 * import { Prisma, Dependente } from '@prisma/client'
 * import { PaginationModel } from '@prisma-utils/nestjs-prisma'
 * import { PrismaService } from '@org/prisma'
 * import { err, ok, Result } from 'neverthrow'
 * import { ApiError } from '@org/clients'
 *
 * @Injectable()
 * export class DependenteService {
 *   constructor(private readonly prismaService: PrismaService) {}
 * }
 *
 * Add this method
 *
  async getById(id: number): Promise<Result<Dependente, Error>> {
    try {
      const result = await this.prismaService.${camelCaseName}.findUniqueOrThrow({
        where: { id: id },
      })

      return ok(result)
    } catch (e) {
      throw new ApiError({
        errors: [],
        statusCode: 500,
        msg: e.message,
      })
    }
  }
 */

import { ClassDeclaration, SourceFile } from 'ts-morph'
import { Service, extractData, extractDataWithRelationsToIncludeTrue } from './'
import { Class } from '../dto'

export function genListService({
  cls,
  sourceFile,
  model,
  modelCls,
}: {
  cls: ClassDeclaration
  modelCls: Class
  sourceFile: SourceFile
  model: DMMF.Model
}) {
  const name = model.name
  const camelCaseName = name.charAt(0).toLowerCase() + name.slice(1)
  const noIdFields = modelCls.fields.filter(field => field.field?.relationName === undefined && field.name !== 'id' && field.isInclude !== true)
  const noTakeFields = noIdFields.filter(field => field.name !== 'take' && field.name !== 'skip')
  const countData = extractData(noTakeFields)
  const data = extractData(noTakeFields)
  const include = extractDataWithRelationsToIncludeTrue(modelCls.fields)

  cls.addMethod({
    name: 'list',
    isAsync: true,
    parameters: [{
      name: 'data',
      type: `List${model.name}`,
    }],
    returnType: `Promise<List${model.name}Response>`,
    statements: `
                try {
                  const [items, count] = await this.prismaService.$transaction([
                    this.prismaService.${camelCaseName}.findMany({
                        where: {
                            ${data}
                        },
                        ${include ? `include: {
                          ${include}
                        },` : ''}
                        take: data?.take,
                        skip: data?.skip && data?.take ? (data?.skip - 1) * data?.take : undefined,
                    }),
                    this.prismaService.${camelCaseName}.count({ where: {
                        ${countData}
                    } }),
                  ])
            
                  const take = data?.take ? data?.take : count
                  const skip = data?.skip ? data?.skip : 0
            
                  return {
                    response: {
                      items: items,
                      meta: {
                        totalItems: count,
                        items: items.length,
                        totalPages: Math.ceil(count / take),
                        page: skip / take + 1,
                      },
                    }
                  }
                } catch (e) {
                    throw new ApiError({
                        errors: [],
                        statusCode: 500,
                        msg: e.message,
                      })
                }
        `,
  })

  const importDeclaration = sourceFile.getImportDeclarationOrThrow("@org/clients");
  importDeclaration.addNamedImport(`List${model.name}`);
  importDeclaration.addNamedImport(`List${model.name}Response`);
}
