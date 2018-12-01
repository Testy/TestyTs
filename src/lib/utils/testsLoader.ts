import * as path from 'path';
import * as glob from 'glob';
import { Logger } from '../logger/logger';
import * as tsnode from 'ts-node';
import { TestsCollection } from '../tests/testsCollection';

export class TestsLoader {
    constructor(private logger?: Logger) { }

    public async loadTests(root: string, patterns: string[], tsconfig: {}): Promise<TestsCollection> {
        // We register the tsnode compiler to transpile the test files
        tsnode.register(tsconfig);

        const files: Set<string> = new Set();
        for (const pattern of patterns) {
            const matches = await this.matchFiles(root, pattern);
            for (const file of matches) {
                files.add(path.resolve(root, file));
            }
        }

        const testSuites = new TestsCollection();
        for (const file of files) {
            const importedFile = await import(file);
            for (const key in importedFile) {
                const testSuiteInstance: TestsCollection = importedFile[key].__testSuiteInstance;
                if (!testSuiteInstance)
                    continue;

                testSuites.set(testSuiteInstance.name, testSuiteInstance);
            }
        }

        return testSuites;
    }

    private async matchFiles(root: string, pattern: string) {
        return new Promise<string[]>((resolve, reject) => {
            glob(pattern, { cwd: root, ignore: ['node_modules/**'] }, (err, files) => {
                if (err) reject(err);
                resolve(files);
            });
        });
    }
}