import { Field } from '../dto'
import { Service } from './'
import { mapIdFieldIntoConnect, mapFieldIntoIncludeTrue } from '../prisma'
import { DMMF } from '@prisma/generator-helper'

export function extractData(fields: Field[]): string {

    return fields.map(({ name }) => `${name}: data.${name}`).join(',\n')
}

export function extractDataWithRelationsToConnectId(fields: DMMF.Field[]): string {
    const relations = fields.filter(field => field.relationName !== undefined)

    return relations.map(field => mapIdFieldIntoConnect(field)).join(',\n')
}

export function extractDataWithRelationsToIncludeTrue(fields: Field[]): string {
    const relations = fields.filter(field => field.field !== undefined && field.field.relationName !== undefined)

    return relations.map(field => mapFieldIntoIncludeTrue(field.field!)).join(',\n')
}