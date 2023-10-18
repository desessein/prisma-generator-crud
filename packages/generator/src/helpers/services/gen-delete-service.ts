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
  async getById(id: number): Promise<Result<Dependente, Error>> {
    try {
      const result = await this.prismaService.dependente.findUniqueOrThrow({
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
import { Service, extractData } from './'
import { Class } from '../dto'

export function genDeleteService({
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

  cls.addMethod({
    name: 'delete',
    isAsync: true,
    parameters: [{
      name: 'data',
      type: `Delete${model.name}`,
    }],
    returnType: `Promise<Delete${model.name}Response>`,
    statements: `
            try {
              await this.prismaService.${camelCaseName}.delete({
                where: { id: Number(data.id) },
              })

              return {
                response: null,
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
  importDeclaration.addNamedImport(`Delete${model.name}`);
  importDeclaration.addNamedImport(`Delete${model.name}Response`);
}
