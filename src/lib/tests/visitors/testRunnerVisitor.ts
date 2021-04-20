import * as path from 'path';
import { performance } from 'perf_hooks';
import { TestyConfig } from '../../interfaces/config';
import { CompositeReport } from '../../reporting/report/compositeReport';
import { FailedTestReport } from '../../reporting/report/failedTestReport';
import { LeafReport } from '../../reporting/report/leafReport';
import { Report } from '../../reporting/report/report';
import { SkippedTestReport } from '../../reporting/report/skippedTestReport';
import { SuccessfulTestReport } from '../../reporting/report/successfulTestReport';
import { TestStatus } from '../../testStatus';
import { RootTestSuite } from '../rootTestSuite';
import { TestInstance } from '../test';
import { TestSuiteInstance } from '../testSuite';
import { FailedTestsReportVisitor } from './failedTestsReportVisitor';
import { TestVisitor } from './testVisitor';
import * as fs from 'fs';

export class TestRunnerVisitor implements TestVisitor<Report> {
  private testSuites: TestSuiteInstance[] = [];
  private setupRan = false;

  constructor(private process: NodeJS.Process, private config: TestyConfig) {}

  public async visitTestSuite(tests: TestSuiteInstance): Promise<Report> {
    this.testSuites.push(tests);

    const report = new CompositeReport(tests.name);
    try {
      await this.runSetupFile();
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

  private async runSetupFile() {
    if (this.setupRan) return;

    if (this.config?.setupFile?.length) {
      const setupFilePath = path.resolve(process.cwd(), this.config.setupFile);
      if (fs.existsSync(setupFilePath)) {
        await import(setupFilePath);
      }
    }

    this.setupRan = true;
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
