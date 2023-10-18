import path from 'path';
import { Project } from 'ts-morph';

const project = new Project();

export function generateModuleFile(entityName: string, filePath: string) {
    const outPath = path.join(filePath, entityName.toLowerCase(), entityName.toLowerCase() + '.module.ts')
    
    const sourceFile = project.createSourceFile(outPath, "", { overwrite: true });
    
    const lowerCaseEntityName = entityName.toLowerCase();
    
    // Add imports
    sourceFile.addImportDeclarations([
        {
            moduleSpecifier: `./${lowerCaseEntityName}.controller`,
            namedImports: [`${entityName}Controller`]
        },
        {
            moduleSpecifier: `./${lowerCaseEntityName}.service`,
            namedImports: [`${entityName}Service`]
        },
        {
            moduleSpecifier: '@nestjs/common',
            namedImports: ['Module']
        },
        {
            moduleSpecifier: '@org/prisma',
            namedImports: ['PrismaModule']
        }
    ]);
    
    // Add the Module decorator and class
    sourceFile.addClass({
        name: `${entityName}Module`,
        isExported: true,
        decorators: [{
            name: "Module",
            arguments: ['{\n  imports: [' + `PrismaModule` + '], \n  controllers: [' + `${entityName}Controller` + '],\n  providers: [' + `${entityName}Service` + '],\n}']
        }]
    });

    sourceFile.saveSync();
}