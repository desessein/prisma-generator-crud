import { logger } from '@prisma/sdk';
import path from 'path';
import { Project } from 'ts-morph';

export function genClassIndexDto({ outputPath, exports }: {outputPath: string, exports: string}) {
    const project = new Project();

    const output = path.join(outputPath, "index.ts");

    // Create (or overwrite) the source file
    let sourceFile = project.addSourceFileAtPathIfExists(output);

    // If the file doesn't exist, create it
    if (!sourceFile) {
        sourceFile = project.createSourceFile(output, "", { overwrite: false });
    }

    // Add export declarations
    sourceFile.addExportDeclaration({ moduleSpecifier: exports });

    // Save the changes to disk
    sourceFile.saveSync();
}