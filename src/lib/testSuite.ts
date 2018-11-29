import { TestStatus } from './testStatus';
import { Report } from './reporting/report/report';
import { CompositeReport } from './reporting/report/compositeReport';
import { SuccessfulTestReport } from './reporting/report/successfulTestReport';
import { performance } from 'perf_hooks';
import { SkippedTestReport } from './reporting/report/skippedTestReport';
import { FailedTestReport } from './reporting/report/failedTestReport';
import { Logger } from './logger/logger';
import { Test } from './interfaces/test';
import { TestsCollection } from './utils/testsCollection';

/** 
 * Contains a list of tests, focusedTests, ignored tests, and a context in which to execute them.
 */
export class TestSuite<T> {
    public get name(): string { return this._name; }
    public get status(): TestStatus { return this._status; }

    constructor(
        private _name: string,
        private _status: TestStatus,
        public context: T,
        public tests: TestsCollection,
        private beforeAllMethods: Array<() => any>,
        private beforeEachMethods: Array<() => any>,
        private afterEachMethods: Array<() => any>,
        private afterAllMethods: Array<() => any>,
    ) {
    }

    public async run(logger?: Logger): Promise<Report> {
        const activeTests = this.tests.activeTests();

        try {
            await this.beforeAll();
        } catch (err) {
            return this.getFailureReport(err.message, logger);
        }

        const report = new CompositeReport(this.name, logger);
        if (logger) { logger.increaseIndentation(); }

        for (const testName of activeTests.testNames) {
            const test = activeTests.get(testName);
            const testReport = test instanceof TestsCollection
                ? await this.runTestcases(testName, test, logger)
                : await this.runTest(testName, test, logger);

            report.addReport(testReport);
        }


        this.reportIgnoredTests(report);

        if (logger) { logger.decreaseIndentation(); }

        try {
            await this.afterAll();
        } catch (err) {
            return this.getFailureReport(err.message, logger);
        }

        return report;
    }

    private async runTest(name: string, test: Test, logger?: Logger): Promise<Report> {
        const t0 = performance.now();
        try {
            await this.beforeEach();
            await test.run(this.context);
            await this.afterEach();
            const report = new SuccessfulTestReport(name, performance.now() - t0, logger);
            return report;
        }
        catch (err) {
            return new FailedTestReport(name, err.message, performance.now() - t0, logger);
        }
    }

    private async runTestcases(name: string, testCases: TestsCollection, logger?: Logger): Promise<Report> {
        const report = new CompositeReport(name, logger);

        if (logger) { logger.increaseIndentation(); }
        for (const testCaseName of testCases.testNames) {
            const testCase = testCases[testCaseName];
            const testReport = await this.runTest(testCaseName, testCase, logger);
            report.addReport(testReport);
        }
        if (logger) { logger.decreaseIndentation(); }

        return report;
    }

    private async reportIgnoredTests(report: CompositeReport, logger?: Logger) {
        if (true) // has ignored tests
            return;

        // for (const test of this.getIgnoredTests()) {
        //     report.addReport(new SkippedTestReport(test, logger));
        // }
    }

    private getFailureReport(reason: string, logger?: Logger) {
        const report = new CompositeReport(this.name, logger);

        // for (const testName of this.getActiveTests().testNames) {
        //     const test = this.tests.get(testName);

        //     if (test instanceof TestsCollection) {
        //         for (const subTestName in test) {
        //             report.addReport(new FailedTestReport(subTestName, reason, 0, logger));
        //         }
        //     }
        //     else {
        //         report.addReport(new FailedTestReport(testName, reason, 0, logger));
        //     }
        // }

        // for (const testName in this.getIgnoredTests()) {
        //     report.addReport(new SkippedTestReport(testName, logger));
        // }

        return report;
    }

    private beforeEach() {
        this.beforeEachMethods.forEach(x => x.bind(this.context)());
    }

    private beforeAll() {
        this.beforeAllMethods.forEach(x => x.bind(this.context)());
    }

    private afterEach() {
        this.afterEachMethods.forEach(x => x.bind(this.context)());
    }

    private afterAll() {
        this.afterAllMethods.forEach(x => x.bind(this.context)());
    }
}