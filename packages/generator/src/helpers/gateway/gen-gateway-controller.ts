import path from 'path';
import { Project, Scope } from 'ts-morph';

export function generateGatewayControllerFile(entityName: string, filePath: string) {
    const project = new Project();

    const outPath = path.join(filePath, entityName.toLowerCase(), entityName.toLowerCase() + '-gateway.controller.ts')

    const sourceFile = project.createSourceFile(outPath, "", { overwrite: true });
    
    const lowerCaseEntityName = entityName.toLowerCase();
    
    // Add imports
    sourceFile.addImportDeclarations([
        {
            moduleSpecifier: '@nestjs/common',
            namedImports: ['Body', 'Controller', 'Delete', 'Get', 'Param', 'Post', 'Put']
        },
        {
            moduleSpecifier: '@nestjs/swagger',
            namedImports: ['ApiTags']
        },
        {
            moduleSpecifier: 'rxjs',
            namedImports: ['firstValueFrom']
        },
        {
            moduleSpecifier: '@org/clients',
            namedImports: [
                `${entityName}ClientProxy`,
                `Create${entityName}`,
                `Create${entityName}Response`,
                `Get${entityName}`,
                `Get${entityName}Response`,
                `List${entityName}`,
                `List${entityName}Response`,
                `Delete${entityName}`,
                `Delete${entityName}Response`,
                `Update${entityName}`,
                `Update${entityName}Response`
            ]
        }
    ]);
    
    // Add the Controller class
    const classDeclaration = sourceFile.addClass({
        name: `${entityName}Controller`,
        isExported: true,
        decorators: [
            {
                name: "Controller",
                arguments: [`'${lowerCaseEntityName}'`]
            },
            {
                name: "ApiTags",
                arguments: [`'${lowerCaseEntityName}'`]
            }
        ]
    });

    // Constructor
    classDeclaration.addConstructor({
        parameters: [{
            name: "proxy",
            type: `${entityName}ClientProxy`,
            scope: Scope.Private,
            isReadonly: true
        }]
    });
    
    // Methods
    const methods = [
        { name: 'list', route: 'list', httpMethod: 'Post', body: true },
        { name: 'get', route: ':id', httpMethod: 'Get', param: true },
        { name: 'update', route: ':id', httpMethod: 'Put', param: true, body: true },
        { name: 'delete', route: ':id', httpMethod: 'Delete', param: true },
        { name: 'create', route: '', httpMethod: 'Post', body: true }
    ];

    for (const method of methods) {
        const methodDec = classDeclaration.addMethod({
            name: method.name,
            isAsync: true,
            returnType: `Promise<${method.name.charAt(0).toUpperCase() + method.name.slice(1)}${entityName}Response>`,
            decorators: [{
                name: method.httpMethod,
                arguments: [`'${method.route}'`]
            }]
        });

        if (method.param) {
            methodDec.addParameter({
                name: 'id',
                type: 'number',
                decorators: [{
                    name: 'Param',
                    arguments: ['\'id\'']
                }]
            });
        }

        if (method.body) {
            methodDec.addParameter({
                name: 'body',
                type: `${method.name.charAt(0).toUpperCase() + method.name.slice(1)}${entityName}`,
                decorators: [{
                    name: 'Body()'
                }]
            });
        }

        methodDec.addStatements(`return firstValueFrom(this.proxy.${method.name}(${method.param ? (method.body ? "{ id, ...body }" : "{ id }") : "body"} as ${method.name.charAt(0).toUpperCase() + method.name.slice(1)}${entityName}));`);
    }

    // Save the changes to disk
    sourceFile.saveSync();
}