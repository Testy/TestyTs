import { Logger } from './logger/logger';

/** The @testSuite decorator adds all this classe's properties and methods to the target
 * class to create inheritance. This is why some method names break the style convention
 * and start by an underscore; we want to minimise conflicts with the user's methods.
 */
export class TestSuite {
    readonly name: string;
    readonly flag: TestFlags;
    private tests: { [name: string]: any };
    private focusedTests: { [name: string]: any };
    private ignoredTests: string[];

    constructor(private logger: Logger) { }

    public async run(): Promise<void> {
        const activeTests = this._getActiveTests();

        if (!activeTests || Object.keys(activeTests).length === 0) {
            throw new Error(`No tests found for ${this.name}. Did you forget to add the @test decorator?`);
        }

        this.logger.increaseIndentation();
        for (const testName in activeTests) {
            const test = activeTests[testName];

            this._hasTestcases(test)
                ? await this._runTestcases(testName, test)
                : await this._runTest(testName, test);
        }

        this._reportIgnoredTests();
        this.logger.decreaseIndentation();
        this.logger.info();
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

    private async _reportIgnoredTests() {
        if (!this._hasIgnoredTests())
            return;

        this.logger.warn('Some tests were ignored.');
        this.logger.increaseIndentation();
        for (const test of this._getIgnoredTests()) {
            this.logger.info(test);
        }
        this.logger.decreaseIndentation();
    }

    private _getActiveTests(): { [name: string]: any } {
        return this._hasFocusedTests()
            ? this.focusedTests
            : this.tests;
    }

    private _getIgnoredTests(): string[] {
        return this._hasFocusedTests()
            ? this.ignoredTests.concat(Object.keys(this.tests))
            : this.ignoredTests;
    }

    private _hasTestcases(test: Function | { [name: string]: Function }) {
        return !(test instanceof Function);
    }

    private _hasIgnoredTests() {
        return this._getIgnoredTests().length > 0;
    }

    private _hasFocusedTests() {
        return this.focusedTests && Object.keys(this.focusedTests).length > 0;
    }
}

export enum TestFlags { None, Focused, Ignored }