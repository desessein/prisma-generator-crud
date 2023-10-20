import path from 'path';
import { Project } from 'ts-morph';


export function generateResponseClasses(entityName: string, filePath: string) {
    const project = new Project();
    // Get or create the source file

    const outPath = path.join(filePath, entityName.toLowerCase(), entityName + 'Responses.dto.ts')

    const sourceFile = project.createSourceFile(outPath, "", { overwrite: true });

    // Define class names and their response types
    const classes = [
        { name: 'Create', type: `${entityName}` },
        { name: 'List', type: `{ items: ${entityName}[]; meta: { totalItems: number; items: number; totalPages: number; page: number; }; }`, },
        { name: 'Delete', type: `any` },
        { name: 'Update', type: `${entityName}` },
        { name: 'Get', type: `${entityName}` }
    ];

    // Iterate over the classes and add them to the source file
    for (const cls of classes) {
        sourceFile.addClass({
            name: `${cls.name}${entityName}Response`,
            isExported: true,
            properties: [{
                name: 'response',
                type: cls.type,
                hasExclamationToken: true
            }]
        });
    }
    
    sourceFile.addImportDeclaration({
        moduleSpecifier: '@org/prisma',
        namedImports: [entityName]
    });

    // Save the source file
    sourceFile.saveSync();
}