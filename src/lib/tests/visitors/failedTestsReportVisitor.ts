import { TestsVisitor } from './testVisitor';
import { Report } from '../../reporting/report/report';
import { Test } from '../test';
import { TestsCollection } from '../testsCollection';
import { CompositeReport } from '../../reporting/report/compositeReport';
import { Logger } from '../../logger/logger';
import { TestStatus } from '../../testStatus';
import { SkippedTestReport } from '../../reporting/report/skippedTestReport';
import { FailedTestReport } from '../../reporting/report/failedTestReport';

export class FailedTestsReportVisitor implements TestsVisitor<Report> {
    constructor(private reason: string, private logger?: Logger) { }

    public async visitTest(test: Test): Promise<Report> {
        if (test.status === TestStatus.Ignored) {
            return new SkippedTestReport(test.name, this.logger);
        }

        return new FailedTestReport(test.name, this.reason, 0, this.logger);
    }

    public async visitTestCollection(tests: TestsCollection): Promise<Report> {
        const report = new CompositeReport(tests.name, this.logger);

        this.logger.increaseIndentation();
        for (const id of tests.testIds) {
            report.addReport(await tests.get(id).accept(this));
        }

        this.logger.decreaseIndentation();
        return report;
    }
}