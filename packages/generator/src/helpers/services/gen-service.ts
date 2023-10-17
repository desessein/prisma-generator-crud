import { DMMF } from '@prisma/generator-helper';
import { logger } from '@prisma/sdk';
import Module from 'module';
import path from 'path';
import { ClassDeclaration, Project, Scope, SourceFile } from 'ts-morph';

export function genService({ outputPath, model }: {outputPath: string, model: DMMF.Model}) {
    const project = new Project();

    const name = model.name

    const outPath = path.join(outputPath, model.name, name.toLowerCase() + '.service.ts')

    logger.info(`outpath ${outPath}`)

    // Create (or overwrite) the source file. You can also load an existing one.
    const sourceFile = project.createSourceFile(outPath, "", { overwrite: true });
    
    const classDeclaration = sourceFile.addClass({
        name: name + 'Service', 
        isExported: true
    });

    addConstructor(classDeclaration)
    addDecorator(classDeclaration)
    addImports(sourceFile, model)

    return {
        classDeclaration,
        sourceFile,
    }
}

export function addDecorator(cls: ClassDeclaration) {
    cls.addDecorator({
        name: "Injectable",
        arguments: []
    });
}

export function addConstructor(cls: ClassDeclaration) {
    cls.addConstructor({
        parameters: [
            {
                name: "prismaService",
                type: "PrismaService",
                scope: Scope.Private,
                isReadonly: true
            }
        ]
    });
}

export function addImports(sourceFile: SourceFile, model: DMMF.Model) {
    sourceFile.addImportDeclaration({
        moduleSpecifier: '@nestjs/common',
        namedImports: ['Injectable']
    });
    
    sourceFile.addImportDeclaration({
        moduleSpecifier: '@org/prisma',
        namedImports: ['PrismaService']
    });
    
    sourceFile.addImportDeclaration({
        moduleSpecifier: '@org/clients',
        namedImports: ['ApiError']
    });
}