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
 * class CreateUserEntity {
 *     email: string;
 *     name: string;
 *     dependentesIds: number[];
 * }
 */

export function genCreateInputDto(model: DMMF.Model): Class {
    const noIdField = model.fields.filter(field => !field.isId)

    const fields = noIdField.map(field => ({
        type: getFieldType(field),
        name: getFieldName(field),
        optional: true,
        field,
    } as Field))

    const cls: Class = {
        name: getClassName({model, prefix: 'Create'}),
        fields,
    }

    return cls
}