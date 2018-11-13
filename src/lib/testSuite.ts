import { Logger } from './logger/logger';
import { TestStatus } from './testStatus';
import { Report } from './reporting/report/report';
import { CompositeReport } from './reporting/report/compositeReport';
import { SuccessfulTestReport } from './reporting/report/successfulTestReport';
import { performance } from 'perf_hooks';
import { SkippedTestReport } from './reporting/report/skippedTestReport';
import { FailedTestReport } from './reporting/report/failedTestReport';

/** The @testSuite decorator adds all this classe's properties and methods to the target
 * class to create inheritance. This is why some method names break the style convention
 * and start by an underscore; we want to minimise conflicts with the user's methods.
 */
export class TestSuite {
    readonly name: string;
    readonly status: TestStatus;
    private tests: { [name: string]: any };
    private focusedTests: { [name: string]: any };
    private ignoredTests: string[];

    constructor(private logger: Logger) { }

    public async run(): Promise<Report> {
        const activeTests = this._getActiveTests();

        if (!activeTests || Object.keys(activeTests).length === 0) {
            throw new Error(`No tests found for ${this.name}. Did you forget to add the @test decorator?`);
        }

        const report = new CompositeReport(this.name);
        for (const testName in activeTests) {
            const test = activeTests[testName];

            const testReport = this._hasTestcases(test)
                ? await this._runTestcases(testName, test)
                : await this._runTest(testName, test);

            report.addReport(testReport);
        }

        this._reportIgnoredTests(report);
        return report;
    }

    private async _runTest(name: string, test: Function): Promise<Report> {

        const t0 = performance.now();
        try {
            await test.bind(this)();
            return new SuccessfulTestReport(name, performance.now() - t0);
        }
        catch (err) {
            return new FailedTestReport(name, err.message, performance.now() - t0);
        }
    }

    private async _runTestcases(name: string, testCases: { [name: string]: Function }): Promise<Report> {
        const report = new CompositeReport(name);

        for (const testCaseName in testCases) {
            const testCase = testCases[testCaseName];
            report.addReport(await this._runTest(testCaseName, testCase));
        }

        return report;
    }

    private async _reportIgnoredTests(report: CompositeReport) {
        if (!this._hasIgnoredTests())
            return;

        for (const test of this._getIgnoredTests()) {
            report.addReport(new SkippedTestReport(test));
        }
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