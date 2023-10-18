import path from 'path';
import { Project, Scope, StructureKind } from 'ts-morph';

export function generateDependenteClientProxy(entityName: string, outputPath: string) {
  const project = new Project();

  const outPath = path.join(outputPath, entityName.toLowerCase(), entityName + 'Client.proxy.ts')

  const sourceFile = project.createSourceFile(outPath, undefined, { overwrite: true });

  const importIdentifiers = [
    'Create' + entityName,
    'Create' + entityName + 'Response',
    'Create' + entityName + 'Identifier',
    'Get' + entityName,
    'Get' + entityName + 'Response',
    'Get' + entityName + 'Identifier',
    'List' + entityName,
    'List' + entityName + 'Response',
    'List' + entityName + 'Identifier',
    'Delete' + entityName,
    'Delete' + entityName + 'Response',
    'Delete' + entityName + 'Identifier',
    'Update' + entityName,
    'Update' + entityName + 'Response',
    'Update' + entityName + 'Identifier',
  ];

  // Adding imports
  sourceFile.addImportDeclaration({
    moduleSpecifier: '@org/clients',
    namedImports: importIdentifiers
  });
  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/microservices',
      namedImports: ['ClientProxy']
    },
    {
      moduleSpecifier: 'rxjs',
      namedImports: ['Observable']
    }
  ]);

  sourceFile.addClass({
    kind: StructureKind.Class,
    name: `${entityName}ClientProxy`,
    isExported: true,
    properties: [
      {
        kind: StructureKind.Property,
        name: "client",
        type: "ClientProxy",
        scope: Scope.Private
      }
    ],
    ctors: [
      {
        kind: StructureKind.Constructor,
        parameters: [{
          name: 'client',
          type: 'ClientProxy'
        }],
        statements: `this.client = client;`
      }
    ],
    methods: ['create', 'get', 'list', 'update', 'delete'].map(methodName => ({
      kind: StructureKind.Method,
      name: methodName,
      parameters: [{
        name: 'input',
        type: methodName.charAt(0).toUpperCase() + methodName.slice(1) + entityName
      }],
      returnType: `Observable<${methodName.charAt(0).toUpperCase() + methodName.slice(1) + entityName + 'Response'}>`,
      statements: `return this.client.send<${methodName.charAt(0).toUpperCase() + methodName.slice(1) + entityName + 'Response'}, ${methodName.charAt(0).toUpperCase() + methodName.slice(1) + entityName}>(${methodName.charAt(0).toUpperCase() + methodName.slice(1) + entityName + 'Identifier'}, input);`
    }))
  });

  // You can then save the file
  sourceFile.saveSync();
}