import { TestSuite } from './testSuite';
import { TestStatus } from './testStatus';
import { CompositeReport } from './reporting/report/compositeReport';
import { SkippedTestReport } from './reporting/report/skippedTestReport';
import { Report } from './reporting/report/report';

/**
 * Runs all tests decorated with @testSuite and @ftestSuite.
 */
export class TestRunner {
    private static _testRunner: TestRunner;
    public static get testRunner(): TestRunner { return TestRunner._testRunner; }
    private testSuites: TestSuite[] = [];

    public constructor() { }

    static initialize() {
        TestRunner._testRunner = new TestRunner();
    }

    public addTestSuite(testSuite: TestSuite) {
        this.testSuites.push(testSuite);
    }

    public async runTests(): Promise<Report> {
        const report = new CompositeReport('Test Runner');
        for (const testSuite of this.getActiveTests()) {
            report.addReport(await testSuite.run());

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
