import { Logger, Color } from '../../../logger/logger';
import { CompositeReport } from '../../../reporting/report/compositeReport';
import { FailedTestReport } from '../../../reporting/report/failedTestReport';
import { Report } from '../../../reporting/report/report';
import { TestResult } from '../../../reporting/report/testResult';
import { TestInstance } from '../../test';
import { TestSuiteInstance } from '../../testSuite';
import { TestVisitor } from '../testVisitor';
import { TestsVisitorDecorator } from './testsVisitorDecorator';
import { RootTestSuite } from '../../rootTestSuite';

export class TapTestReporterDecorator extends TestsVisitorDecorator<Report> {
    private counter = 1;

    constructor(baseVisitor: TestVisitor<Report>, private logger: Logger) {
        super(baseVisitor);
    }

    public async visitTest(test: TestInstance): Promise<Report> {
        const report = await this.baseVisitTest(test);

        let msg;
        const safeName = test.name.replace('#', ' ');
        if (report.result === TestResult.Success) {
            msg = `ok ${this.counter} ${safeName}`;
        }
        else if (report instanceof FailedTestReport) {
            msg = `not ok ${this.counter} ${safeName}`;
        }
        else {
            msg = `ok ${this.counter} ${safeName} # SKIP`;
        }

        this.logger.info(msg);

        this.counter += 1;

        return report;
    }

    public async visitTestSuite(tests: TestSuiteInstance): Promise<Report> {
        this.logger.info(`# ${tests.name}`);
        const returnValue = await this.baseVisitTestSuite(tests);
        return returnValue;
    }

    public async visitRootTestSuite(tests: RootTestSuite): Promise<CompositeReport> {
        const report = await this.visitTestSuite(tests) as CompositeReport;

        this.logger.info(`1..${report.numberOfTests - report.numberOfSkippedTests}`);

        return report;
    }
}