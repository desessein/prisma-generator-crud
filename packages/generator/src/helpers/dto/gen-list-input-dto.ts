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
 * class ListUserEntity {
 *     id: string
 *     email: string;
 *     name: string;
 *     dependentesIds: number[];
 * }
 */

export function genListInputDto(model: DMMF.Model): Class {
    const fields = model.fields.map(field => ({
        type: getFieldType(field),
        name: getFieldName(field),
        optional: true,
        field,
    } as Field))

    const includeFields = model.fields.map(field => ({
        name: field.name + 'Include',
        type: 'boolean',
        optional: true,
        isInclude: true,
    } as Field))

    const cls: Class = {
        name: getClassName({model, prefix: 'List'}),
        fields: [
            ...fields,
            ...includeFields,
            {
                name: 'take',
                type: 'number',
                optional: false,
            },
            {
                name: 'skip',
                type: 'number',
                optional: false,
            },            
        ],
    }

    return cls
}