import { TestSuiteInstance } from '../testSuite';
import { TestInstance } from '../test';
import { SuccessfulTestReport } from '../../reporting/report/successfulTestReport';
import { FailedTestReport } from '../../reporting/report/failedTestReport';
import { TestStatus } from '../../testStatus';
import { SkippedTestReport } from '../../reporting/report/skippedTestReport';
import { Report } from '../../reporting/report/report';
import { CompositeReport } from '../../reporting/report/compositeReport';
import { FailedTestsReportVisitor } from './failedTestsReportVisitor';
import { LeafReport } from '../../reporting/report/leafReport';
import { TestVisitor } from './testVisitor';
import { RootTestSuite } from '../rootTestSuite';
import { performance } from 'perf_hooks';
import { TestyConfig } from '../../interfaces/config';

export class TestRunnerVisitor implements TestVisitor<Report> {
  private testSuites: TestSuiteInstance[] = [];

  constructor(private process: NodeJS.Process, private config: TestyConfig) {}

  public async visitTestSuite(tests: TestSuiteInstance): Promise<Report> {
    this.testSuites.push(tests);

    const report = new CompositeReport(tests.name);
    try {
      await this.runAll(tests.beforeAllMethods, tests.context);
      await this.runTests(tests, report);
      await this.runAll(tests.afterAllMethods, tests.context);
    } catch (err) {
      this.process.exitCode = 1;
      const failedTestsVisitor = new FailedTestsReportVisitor(typeof err === typeof '' ? err : err.message);
      return await tests.accept(failedTestsVisitor);
    } finally {
      this.testSuites.pop();
    }

    return report;
  }

  public async visitTest(test: TestInstance): Promise<Report> {
    let report: LeafReport;

    if (test.status === TestStatus.Ignored) {
      report = new SkippedTestReport(test.name);
    } else {
      try {
        const context = this.getClosestContext();
        await this.runBeforeEachMethods();

        const start = performance.now();
        await test.run(context, this.config);
        const time = performance.now() - start;

        await this.runAfterEachMethods();
        report = new SuccessfulTestReport(test.name, Math.round(time));
      } catch (err) {
        this.process.exitCode = 1;
        report = new FailedTestReport(test.name, typeof err === typeof '' ? err : err.message, 0);
      }
    }

    return report;
  }

  private async runTests(tests: TestSuiteInstance, report: CompositeReport): Promise<void> {
    for (const id of tests.testIds) {
      const test = tests.get(id);
      const testReport = await (test as TestInstance).accept<Report>(this);
      report.addReport(testReport);
    }
  }

  public async visitRootTestSuite(tests: RootTestSuite): Promise<Report> {
    return await this.visitTestSuite(tests);
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
