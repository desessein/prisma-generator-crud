import { DMMF } from '@prisma/generator-helper'
/**
 * Purpose of this is class is this:
 * model User {
 *   id    Int     @id @default(autoincrement())
 *   email String  @unique
 *   name  String?
 *   dependente Dependente[]
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
 * async update(
 *   data: Prisma.DependenteCreateInput,
 * ): Promise<Result<Dependente, Error>> {
 *   try {
 *     const result = await this.prismaService.dependente.update({ data: data })
 *
 *     return ok(result)
 *   } catch (e) {
 *         throw new ApiError({
 *           errors: [],
 *           statusCode: 500,
 *           msg: e.message,
 *         })
 *       }
 * }
 */

import { ClassDeclaration, SourceFile } from 'ts-morph'
import { Service, extractData, extractDataWithRelationsToConnectId } from './'
import { Class } from '../dto'

export function genUpdateService({
  cls,
  modelCls,
  sourceFile,
  model,
}: {
  cls: ClassDeclaration
  modelCls: Class
  sourceFile: SourceFile
  model: DMMF.Model
}) {
  const name = model.name
  const camelCaseName = name.charAt(0).toLowerCase() + name.slice(1)
  const noIdFields = modelCls.fields.filter(field => field.field?.relationName === undefined && field.name !== 'id')
  const data = extractData(noIdFields)
  const relationFields = extractDataWithRelationsToConnectId(model.fields)

  cls.addMethod({
    name: 'update',
    isAsync: true,
    parameters: [{
      name: 'data',
      type: `Update${model.name}`,
    }],
    returnType: `Promise<Update${model.name}Response>`,
    statements: `
            try {
                const result = await this.prismaService.${camelCaseName}.update({ 
                    where: { id: Number(data.id) },
                    data: {
                        ${data},
                        ${relationFields}
                    } 
              });
              
              return {
                response: result,
              };
            } catch (e) {
                throw new ApiError({
                    errors: [],
                    statusCode: 500,
                    msg: e.message
                });
            }
        `,
  })

  const importDeclaration = sourceFile.getImportDeclarationOrThrow("@org/clients");
  importDeclaration.addNamedImport(`Update${model.name}`);
  importDeclaration.addNamedImport(`Update${model.name}Response`);
}
