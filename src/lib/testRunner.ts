import { TestSuite } from './testSuite';
import { TestStatus } from './testStatus';
import { CompositeReport } from './reporting/report/compositeReport';
import { SkippedTestReport } from './reporting/report/skippedTestReport';
import { Report } from './reporting/report/report';
import { RootReport } from './reporting/report/rootReport';
import { Logger } from './logger/logger';

/**
 * Runs all tests decorated with @testSuite and @ftestSuite.
 */
export class TestRunner {
    private static _testRunner: TestRunner;
    public static get testRunner(): TestRunner { return TestRunner._testRunner; }
    private testSuites: Array<TestSuite<any>> = [];

    public constructor() { }

    static initialize() {
        TestRunner._testRunner = new TestRunner();
    }

    public addTestSuite(testSuite: TestSuite<any>) {
        this.testSuites.push(testSuite);
    }

    public async runTests(logger: Logger): Promise<RootReport> {
        const report = new RootReport(logger);
        for (const testSuite of this.getActiveTests()) {
            report.addReport(await testSuite.run(logger));

        }

        this.reportIgnoredTestSuites(report);

        return report;
    }

    private reportIgnoredTestSuites(report: CompositeReport) {
        if (!this.hasIgnoredTests())
            return;

        for (const testSuite of this.getIgnoredTests()) {
            report.addReport(new SkippedTestReport(testSuite.name));
        }
    }

    private getActiveTests() {
        return this.testSuites.filter(x => this.hasFocusedTests() && x.status === TestStatus.Focused || !this.hasFocusedTests() && x.status !== TestStatus.Ignored);
    }

    private getIgnoredTests() {
        return this.testSuites.filter(x => this.hasFocusedTests() && x.status !== TestStatus.Focused || x.status === TestStatus.Ignored);
    }

    private hasFocusedTests() {
        return this.testSuites.find(x => x.status === TestStatus.Focused) !== undefined;
    }

    private hasIgnoredTests() {
        return this.getIgnoredTests().length > 0;
    }
}

TestRunner.initialize();
