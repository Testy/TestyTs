import { TestsVisitor } from './testVisitor';
import { Report } from '../../reporting/report/report';
import { Test } from '../test';
import { TestsCollection } from '../testsCollection';
import { CompositeReport } from '../../reporting/report/compositeReport';
import { TestStatus } from '../../testStatus';
import { SkippedTestReport } from '../../reporting/report/skippedTestReport';
import { FailedTestReport } from '../../reporting/report/failedTestReport';
import { LeafReport } from '../../reporting/report/leafReport';
import { Logger } from '../../logger/logger';

export class FailedTestsReportVisitor implements TestsVisitor<Report> {
    constructor(private reason: string, private logger: Logger) { }

    public async visitTest(test: Test): Promise<Report> {
        const report: LeafReport = test.status === TestStatus.Ignored
            ? new SkippedTestReport(test.name)
            : new FailedTestReport(test.name, this.reason, 0);

        report.log(this.logger);
        return report;
    }

    public async visitTestCollection(tests: TestsCollection): Promise<Report> {
        const report = new CompositeReport(tests.name);

        for (const id of tests.testIds) {
            report.addReport(await tests.get(id).accept(this));
        }

        return report;
    }
}