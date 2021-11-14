import { TestStatus } from 'testy-cli/src/lib/testStatus';
import { CompositeReport } from '../../../reporting/report/compositeReport';
import { Report } from '../../../reporting/report/report';
import { RootTestSuite } from '../../rootTestSuite';
import { TestInstance } from '../../test';
import { TestSuiteInstance } from '../../testSuite';
import { TestVisitor } from '../testVisitor';
import { TestsVisitorDecorator } from './test-visitor.decorator';

export abstract class TestReporterDecoratorBase extends TestsVisitorDecorator<Report> {
  constructor(baseVisitor: TestVisitor<Report>) {
    super(baseVisitor);
  }

  public async visitTest(test: TestInstance): Promise<Report> {
    await this.beforeTestRun(test.name, test.status);
    const report = await this.baseVisitTest(test);
    await this.afterTestRun(test.name, test.status, report);

    return report;
  }
  public async visitTestSuite(tests: TestSuiteInstance): Promise<Report> {
    this.beforeTestSuiteRun(tests.name, tests.status);
    const report = await this.baseVisitTestSuite(tests);
    this.afterTestSuiteRun(tests.name, tests.status, report);

    return report;
  }

  public async visitRootTestSuite(tests: RootTestSuite): Promise<CompositeReport> {
    await this.beforeRoot(tests.name, tests.status);
    const report = (await this.baseVisitRootTestSuite(tests)) as CompositeReport;
    await this.afterRoot(tests.name, tests.status, report);

    return report;
  }

  protected abstract beforeRoot(testName: string, testStatus: TestStatus): void | Promise<void>;
  protected abstract afterRoot(testName: string, testStatus: TestStatus, report: CompositeReport): void | Promise<void>;

  protected abstract beforeTestSuiteRun(testName: string, testStatus: TestStatus): void | Promise<void>;
  protected abstract afterTestSuiteRun(testName: string, testStatus: TestStatus, report: Report): void | Promise<void>;

  protected abstract beforeTestRun(testName: string, testStatus: TestStatus): void | Promise<void>;
  protected abstract afterTestRun(testName: string, testStatus: TestStatus, report: Report): void | Promise<Report>;
}
