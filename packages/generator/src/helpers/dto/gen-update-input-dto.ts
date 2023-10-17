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
 * class UpdateUserEntity {
 *     id: number
 *     email: string;
 *     name: string;
 *     dependentesIds: number[];
 * }
 */

export function genUpdateInputDto(model: DMMF.Model): Class {
    const fields = model.fields.map(field => ({
        type: getFieldType(field),
        name: getFieldName(field),
        optional: true,
        field,
    } as Field))

    const cls: Class = {
        name: getClassName({model, prefix: 'Update'}),
        fields,
    }

    return cls
}