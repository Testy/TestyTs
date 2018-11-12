import { Logger } from '../logger/logger';

/** The @testSuite decorator adds all this classe's properties and methods to the target
 * class to create inheritance. This is why some method names break the style convention
 * and start by an underscore; we want to minimise conflicts with the user's methods.
 */
export class TestSuite {
    readonly name: string;
    readonly flag: TestFlags;
    private tests: {};

    constructor(private logger: Logger) { }

    public async run(): Promise<void> {
        if (!this.tests) {
            throw new Error(`No tests found for ${this.name}. Did you forget to add the @test decorator?`);
        }

        this.logger.increaseIndentation();
        for (const testName in this.tests) {
            const test = this.tests[testName];

            this._hasTestcases(test)
                ? await this._runTestcases(testName, test)
                : await this._runTest(testName, test);
        }
        this.logger.decreaseIndentation();
    }

    private async _runTest(name: string, test: Function) {

        try {
            await test.bind(this)();
            this.logger.success(`√ ${name}`);
        }
        catch (err) {
            this.logger.failure(`x ${name} - ${err.message}`);
        }
    }

    private async _runTestcases(name: string, testCases: { [name: string]: Function }) {
        this.logger.increaseIndentation();
        this.logger.info(name);
        for (const testCaseName in testCases) {
            const testCase = testCases[testCaseName];
            await this._runTest(testCaseName, testCase);
        }
        this.logger.decreaseIndentation();
    }

    private _hasTestcases(test: Function | { [name: string]: Function }) {
        return !(test instanceof Function);
    }
}

export enum TestFlags { None, Focused, Ignored }