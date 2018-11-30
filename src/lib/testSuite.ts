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
 * Contains a list of tests and a context in which to execute them.
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
        try {
            await this.beforeAll();
        } catch (err) {
            return this.getFailureReport(err.message, this.name, this.tests, logger);
        }

        const report = new CompositeReport(this.name, logger);
        if (logger) { logger.increaseIndentation(); }

        for (const testName of this.tests.testIds) {
            const test = this.tests.get(testName);
            const testReport = await this.runTestOrTestcases(testName, test, logger);
            report.addReport(testReport);
        }

        if (logger) { logger.decreaseIndentation(); }

        try {
            await this.afterAll();
        } catch (err) {
            return this.getFailureReport(err.message, this.name, this.tests, logger);
        }

        return report;
    }

    private async runTest(name: string, test: Test, logger?: Logger): Promise<Report> {
        if (test.status === TestStatus.Ignored) {
            return new SkippedTestReport(name, logger);
        }

        const t0 = performance.now();
        try {
            await this.beforeEach();
            await test.run(this.context);
            await this.afterEach();
            return new SuccessfulTestReport(name, performance.now() - t0, logger);
        }
        catch (err) {
            return new FailedTestReport(name, err.message, performance.now() - t0, logger);
        }
    }

    private async runTestOrTestcases(name: string, testOrTestcases: Test | TestsCollection, logger?: Logger): Promise<Report> {
        if (testOrTestcases instanceof Test) {
            return await this.runTest(name, testOrTestcases, logger);
        }

        const testcases = testOrTestcases;
        const report = new CompositeReport(name, logger);
        if (logger) { logger.increaseIndentation(); }
        for (const testCaseName of testcases.testIds) {
            const testCase = testcases.get(testCaseName) as Test;
            const testReport = await this.runTestOrTestcases(testCaseName, testCase, logger);
            report.addReport(testReport);
        }
        if (logger) { logger.decreaseIndentation(); }

        return report;
    }

    private getFailureReport(reason: string, name: string, testOrTestsCollection: Test | TestsCollection, logger?: Logger) {
        if (testOrTestsCollection instanceof Test) {
            const test = testOrTestsCollection;
            return test.status === TestStatus.Ignored
                ? new SkippedTestReport(name, logger)
                : new FailedTestReport(name, reason, 0, logger);
        }

        const report = new CompositeReport(name, logger);
        for (const testID of testOrTestsCollection.testIds) {
            const test = testOrTestsCollection.get(testID);
            report.addReport(this.getFailureReport(reason, testID, test, logger));
        }

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