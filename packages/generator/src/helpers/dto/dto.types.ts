import { DMMF } from '@prisma/generator-helper';
export type Field = {
    name: string,
    type: string,
    optional: boolean
    field?: DMMF.Field
    isInclude?: boolean,
}

export type Class = {
    name: string
    exported?: boolean
    fields: Field[]
}
