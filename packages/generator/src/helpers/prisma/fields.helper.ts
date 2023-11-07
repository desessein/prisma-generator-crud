import { DMMF } from "@prisma/generator-helper"

export type FieldType = 'BigInt' | 'Boolean' | 'Bytes' | 'Date' | 'Time' | 'Decimal' | 'Float' | 'Int' | 'JSON' | 'String' |' $ModelName'

export function mapFieldTypeToTypescriptType(type: FieldType) {
    switch (type) {
        case 'BigInt':
        case 'Int':
        case 'Float':
            return 'number'
        case 'Boolean':
            return 'boolean'
        case 'Bytes':
        case 'Date':
        case 'Time':
        case 'Decimal':
        case 'JSON':
        case 'String':
        case ' $ModelName':
            return 'string'
        default:
            return 'string'
    }
}

export function getFieldType(field: DMMF.Field) {
    if(field.relationName === undefined) 
        return mapFieldTypeToTypescriptType(field.type as FieldType)

    return 'number[]'
}

export function getFieldName(field: DMMF.Field) {
    if(field.relationName === undefined) 
        return field.name

    const fieldName = field.name
    const idName = field.isList ? `Ids` : `Id`

    return fieldName + idName
}

export function getFieldOptional(field: DMMF.Field) {
    return !field.isRequired
}

export function mapIdFieldIntoConnect(field: DMMF.Field) {
    if(!field.isList) {
    `
        ${field.name}: data.${field.name}Id ? {
            connect: {
                id: data.${field.name}Id,
            }
        } : undefined
    `
    }

    return `
        ${field.name}: data.${field.name}Ids ? {
            connect: data.${field.name}Ids.map(id => ({ id })),
        } : undefined
    `
}

export function mapFieldIntoIncludeTrue(field: DMMF.Field) {
    return `${field.name}: data.${field.name}Include`
}