import { TestSuite } from '../testSuite';
import { Test } from '../test';
import { TestsVisitor } from './testVisitor';
import { SuccessfulTestReport } from '../../reporting/report/successfulTestReport';
import { FailedTestReport } from '../../reporting/report/failedTestReport';
import { TestStatus } from '../../testStatus';
import { SkippedTestReport } from '../../reporting/report/skippedTestReport';
import { Report } from '../../reporting/report/report';
import { CompositeReport } from '../../reporting/report/compositeReport';
import { FailedTestsReportVisitor } from './failedTestsReportVisitor';
import { LeafReport } from '../../reporting/report/leafReport';

export class TestRunnerVisitor implements TestsVisitor<Report> {
    private testSuites: TestSuite[] = [];

    constructor() { }

    public async visitTestSuite(tests: TestSuite): Promise<Report> {
        this.testSuites.push(tests);

        const report = new CompositeReport(tests.name);

        try {
            await this.runAll(tests.beforeAllMethods, tests.context);
            await this.runTests(tests, report);
            await this.runAll(tests.afterAllMethods, tests.context);
        }
        catch (err) {
            const failedTestsVisitor = new FailedTestsReportVisitor(err.message);
            return await tests.accept(failedTestsVisitor);
        }
        finally {
            this.testSuites.pop();
        }

        return report;
    }

    public async visitTest(test: Test): Promise<Report> {
        let report: LeafReport;

        if (test.status === TestStatus.Ignored) {
            report = new SkippedTestReport(test.name);
        }
        else {
            try {
                const context = this.getClosestContext();
                await this.runBeforeEachMethods();
                await test.run(context);
                await this.runAfterEachMethods();
                report = new SuccessfulTestReport(test.name, 0);
            }
            catch (err) {
                report = new FailedTestReport(test.name, err.message, 0);
            }
        }

        return report;
    }

    private async runTests(tests: TestSuite, report: CompositeReport): Promise<void> {
        for (const id of tests.testIds) {
            const testReport = await tests.get(id).accept(this);
            report.addReport(testReport);
        }
    }

    private async runAll(methods, context: any) {
        for (const method of methods) {
            await method.bind(context)();
        }
    }

    private async runBeforeEachMethods() {
        for (const testSuite of this.testSuites) {
            await this.runAll(testSuite.beforeEachMethods, testSuite.context);
        }
    }

    private async runAfterEachMethods() {
        for (const testSuite of this.testSuites) {
            await this.runAll(testSuite.afterEachMethods, testSuite.context);
        }
    }

    private getClosestContext() {
        for (let i = this.testSuites.length - 1; i >= 0; --i) {
            const context = this.testSuites[i].context;
            if (context !== undefined) return context;
        }
    }
}