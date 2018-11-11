import { basename } from 'path';

export class TestSuitePropertiesAndMethodNamesError extends Error {
    constructor(conflicts: string[]) {
        super(`The following properties and method names are forbidden: ${conflicts.join(', ')}`);
    }
}