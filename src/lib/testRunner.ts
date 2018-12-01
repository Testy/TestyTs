import { TestSuite } from './tests/testSuite';
import { TestStatus } from './testStatus';
import { CompositeReport } from './reporting/report/compositeReport';
import { SkippedTestReport } from './reporting/report/skippedTestReport';
import { RootReport } from './reporting/report/rootReport';
import { Logger } from './logger/logger';

/**
 * Runs all tests decorated with @testSuite and @ftestSuite.
 */
export class TestRunner {
    public constructor(private logger: Logger) { }

    public async runTests(testSuites: Array<TestSuite<any>>): Promise<RootReport> {
        const report = new RootReport(this.logger);
        for (const testSuite of this.getActiveTests(testSuites)) {
            report.addReport(await testSuite.run(this.logger));

        }

        this.reportIgnoredTestSuites(testSuites, report);

        return report;
    }

    // TODO: Create a "TestSuitesCollection" class and move those methods there?
    private reportIgnoredTestSuites(testSuites: Array<TestSuite<any>>, report: CompositeReport) {
        if (!this.hasIgnoredTests(testSuites))
            return;

        for (const testSuite of this.getIgnoredTests(testSuites)) {
            report.addReport(new SkippedTestReport(testSuite.name));
        }
    }

    private getActiveTests(testSuites: Array<TestSuite<any>>) {
        return testSuites.filter(
            x =>
                this.hasFocusedTests(testSuites)
                && x.status === TestStatus.Focused
                || !this.hasFocusedTests(testSuites)
                && x.status !== TestStatus.Ignored
        );
    }

    private getIgnoredTests(testSuites: Array<TestSuite<any>>) {
        return testSuites.filter(
            x =>
                this.hasFocusedTests(testSuites)
                && x.status !== TestStatus.Focused
                || x.status === TestStatus.Ignored
        );
    }

    private hasFocusedTests(testSuites: Array<TestSuite<any>>) {
        return testSuites.find(x => x.status === TestStatus.Focused) !== undefined;
    }

    private hasIgnoredTests(testSuites: Array<TestSuite<any>>) {
        return this.getIgnoredTests(testSuites).length > 0;
    }
}
