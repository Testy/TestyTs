import { TestVisitor } from './testVisitor';
import { Report } from '../../reporting/report/report';
import { Test } from '../test';
import { TestSuite } from '../testSuite';
import { CompositeReport } from '../../reporting/report/compositeReport';
import { TestStatus } from '../../testStatus';
import { SkippedTestReport } from '../../reporting/report/skippedTestReport';
import { FailedTestReport } from '../../reporting/report/failedTestReport';
import { LeafReport } from '../../reporting/report/leafReport';

export class FailedTestsReportVisitor implements TestVisitor<Report> {
    constructor(private reason: string) { }

    public async visitTest(test: Test): Promise<Report> {
        const report: LeafReport = test.status === TestStatus.Ignored
            ? new SkippedTestReport(test.name)
            : new FailedTestReport(test.name, this.reason, 0);

        return report;
    }

    public async visitTestSuite(tests: TestSuite): Promise<Report> {
        const report = new CompositeReport(tests.name);

        for (const id of tests.testIds) {
            report.addReport(await tests.get(id).accept(this));
        }

        return report;
    }
}