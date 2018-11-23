import * as path from 'path';
import * as glob from 'glob';
import { TestRunner } from '../testRunner';

export class TestsLoader {
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
            for (const key in importedFile) {
                const testSuiteInstance = importedFile[key].testSuiteInstance;
                if (testSuiteInstance) {
                    TestRunner.testRunner.addTestSuite(testSuiteInstance);
                }
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