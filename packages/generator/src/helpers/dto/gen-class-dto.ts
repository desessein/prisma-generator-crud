import { DMMF } from '@prisma/generator-helper';
import type { Class } from './dto.types'
import { Project } from 'ts-morph';
import path from 'path'
import { logger } from '@prisma/sdk'

export function writeTSClass({ outputPath, cls, model }: {
    outputPath: string,
    model: DMMF.Model,
    cls: Class,
}) {
    const project = new Project();

    const outPath = path.join(outputPath, model.name.toLowerCase(), `${cls.name}.dto.ts`)
    const sourceFile = project.createSourceFile(outPath, "", { overwrite: true });

    const classDeclaration = sourceFile.addClass({
        name: cls.name,
        isExported: true,
    })

    // Adds fields
    cls.fields.forEach(field => {
        classDeclaration.addProperty({
            name: field.name,
            type: field.type,
            hasQuestionToken: true,
        })
    })

    sourceFile.saveSync()
    logger.info('Generated class: ' + cls.name + ' at ' + outPath)
}