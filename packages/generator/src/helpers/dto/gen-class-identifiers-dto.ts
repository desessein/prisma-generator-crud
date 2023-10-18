import path from 'path';
import { Project, VariableDeclarationKind } from 'ts-morph';


export function generateIdentifiersClasses(entityName: string, filePath: string) {
    const project = new Project();
    // Get or create the source file

    const outPath = path.join(filePath, entityName.toLowerCase(), entityName + 'Identifiers.dto.ts')

    const sourceFile = project.createSourceFile(outPath, "", { overwrite: true });

    // Define identifier names and their values
    const identifiers = [
        { name: 'Create', value: `Create${entityName}Identifier` },
        { name: 'Update', value: `Update${entityName}Identifier` },
        { name: 'Delete', value: `Delete${entityName}Identifier` },
        { name: 'List', value: `Find${entityName}IdentifierById` },
        { name: 'Get', value: `FindAll${entityName}Identifiers` }
    ];

    // Iterate over the identifiers and add them to the source file
    for (const identifier of identifiers) {
        sourceFile.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            isExported: true,
            declarations: [{
                name: `${identifier.name}${entityName}Identifier`,
                initializer: `"${identifier.value}"`
            }]
        });
    }

    sourceFile.saveSync();
}