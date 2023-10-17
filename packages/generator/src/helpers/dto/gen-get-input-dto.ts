import { DMMF } from '@prisma/generator-helper'
import { getFieldName, getFieldType, getClassName } from '../prisma'
import { Field, Class } from './dto.types'

/**
 * Purpose of this is class is this:
 * model User {
 *   id    Int     @id @default(autoincrement())
 *   email String  @unique
 *   name  String?
 *   dependente Dependente[]
 * }
 *
 * should output
 *
 * class DeleteUser {
 *     id: string
 * }
 */

export function genGetInputDto(model: DMMF.Model): Class {
    return {
      name: getClassName({ model, prefix: 'Get' }),
      fields: [
        {
          name: 'id',
          type: 'number',
          optional: false,
        },
      ],
    }
  }