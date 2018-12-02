import { TestsCollection } from '../testsCollection';
import { Test } from '../test';
import { TestsVisitor } from './testVisitor';
import { Logger } from '../../logger/logger';
import { SuccessfulTestReport } from '../../reporting/report/successfulTestReport';
import { FailedTestReport } from '../../reporting/report/failedTestReport';
import { TestStatus } from '../../testStatus';
import { SkippedTestReport } from '../../reporting/report/skippedTestReport';
import { Report } from '../../reporting/report/report';
import { CompositeReport } from '../../reporting/report/compositeReport';
import { FailedTestsReportVisitor } from './failedTestsReportVisitor';
import { LeafReport } from '../../reporting/report/leafReport';

export class TestsRunnerVisitor implements TestsVisitor<Report> {
    private contexts: TestsCollection[] = [];

    constructor(private logger: Logger) { }

    public async visitTestCollection(tests: TestsCollection): Promise<Report> {
        this.contexts.push(tests);

        const report = new CompositeReport(tests.name);
        this.logger.info(tests.name);
        this.logger.increaseIndentation();

        try {
            await this.runAll(tests.beforeAllMethods, tests.context);
            await this.runTests(tests, report);
            await this.runAll(tests.afterAllMethods, tests.context);
        }
        catch (err) {
            const failedTestsVisitor = new FailedTestsReportVisitor(err.message, this.logger);
            return await tests.accept(failedTestsVisitor);
        }
        finally {
            this.logger.decreaseIndentation();
            this.contexts.pop();
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

        report.log(this.logger);
        return report;
    }

    private async runTests(tests: TestsCollection, report: CompositeReport): Promise<void> {
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
        for (const testsCollection of this.contexts) {
            await this.runAll(testsCollection.beforeEachMethods, testsCollection.context);
        }
    }

    private async runAfterEachMethods() {
        for (const testsCollection of this.contexts) {
            await this.runAll(testsCollection.afterEachMethods, testsCollection.context);
        }
    }

    private getClosestContext() {
        for (let i = this.contexts.length - 1; i >= 0; --i) {
            const context = this.contexts[i].context;
            if (context !== undefined) return context;
        }
    }
}