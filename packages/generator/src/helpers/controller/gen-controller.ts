import path from 'path';
import { Project, Scope } from 'ts-morph';


export function generateControllerFile(entityName: string, filePath: string) {
    const project = new Project();

    const outPath = path.join(filePath, entityName.toLowerCase(), entityName.toLowerCase() + '.controller.ts')

    const sourceFile = project.createSourceFile(outPath, "", { overwrite: true });
    
    const lowerCaseEntityName = entityName.toLowerCase();
    
    // Add imports
    sourceFile.addImportDeclaration({
        moduleSpecifier: `./${lowerCaseEntityName}.service`,
        namedImports: [`${entityName}Service`]
    });

    sourceFile.addImportDeclarations([
        {
            moduleSpecifier: '@org/clients',
            namedImports: [
                `Create${entityName}`,
                `Create${entityName}Response`,
                `Create${entityName}Identifier`,
                `Get${entityName}`,
                `Get${entityName}Response`,
                `Get${entityName}Identifier`,
                `List${entityName}`,
                `List${entityName}Response`,
                `List${entityName}Identifier`,
                `Delete${entityName}`,
                `Delete${entityName}Response`,
                `Delete${entityName}Identifier`,
                `Update${entityName}`,
                `Update${entityName}Response`,
                `Update${entityName}Identifier`,
            ]
        },
        {
            moduleSpecifier: '@nestjs/common',
            namedImports: ['Controller']
        },
        {
            moduleSpecifier: '@nestjs/microservices',
            namedImports: ['MessagePattern']
        }
    ]);
    
    // Add the class
    const classDeclaration = sourceFile.addClass({
        name: `${entityName}Controller`,
        isExported: true,
        decorators: [{
            name: "Controller",
            arguments: []
        }]
    });

    // Add constructor to the class
    classDeclaration.addConstructor({
        parameters: [{
            name: "service",
            type: `${entityName}Service`,
            scope: Scope.Private
        }]
    });
    
    // Methods to add
    const methods = ['create', 'get', 'list', 'update', 'delete'];

    for (const method of methods) {
        classDeclaration.addMethod({
            name: method,
            decorators: [{
                name: "MessagePattern",
                arguments: [`${method.charAt(0).toUpperCase() + method.slice(1)}${entityName}Identifier`]
            }],
            parameters: [{
                name: 'input',
                type: `${method.charAt(0).toUpperCase() + method.slice(1)}${entityName}`
            }],
            returnType: `Promise<${method.charAt(0).toUpperCase() + method.slice(1)}${entityName}Response>`,
            statements: `return this.service.${method}(input);`
        });
    }

    // Save the changes to disk
    sourceFile.saveSync();
}