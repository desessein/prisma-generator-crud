import { DMMF } from "@prisma/generator-helper"

export function getClassName({model, prefix}: {
    model: DMMF.Model
    prefix: string
}) {
    return `${prefix}${model.name}`
}