import * as path from 'path';
import * as glob from 'glob';
import { TestRunner } from '../testRunner';
import { Logger } from '../logger/logger';

export class TestsLoader {
    constructor(private logger: Logger) { }

    public async loadTests(patterns: string[]) {
        const files: Set<string> = new Set();
        for (const pattern of patterns) {
            const matches = await this.matchFiles(pattern);
            for (const file of matches) {
                files.add(path.resolve(process.cwd(), file));
            }
        }

        for (const file of files) {
            const importedFile = await import(file);
            let hasTestSuites = false;
            for (const key in importedFile) {
                const testSuiteInstance = importedFile[key].testSuiteInstance;
                if (!testSuiteInstance)
                    continue;

                hasTestSuites = true;
                TestRunner.testRunner.addTestSuite(testSuiteInstance);
            }

            if (!hasTestSuites) {
                this.logger.warn(`No tests were discovered in the following file: ${file}. Did you forget to add the 'export' keyword to your class?`);
            }
        }
    }

    private async matchFiles(pattern: string) {
        return new Promise<string[]>((resolve, reject) => {
            glob(pattern, { ignore: ['node_modules/**'] }, (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
        });
    }
}