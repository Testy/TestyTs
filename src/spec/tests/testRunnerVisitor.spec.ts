import { TestSuite, BeforeEach, Test, expect } from '../../testyCore';
import { TestRunnerVisitor } from '../../lib/tests/visitors/testRunnerVisitor';
import { TestSuiteInstance } from '../../lib/tests/testSuite';
import { TestInstance } from '../../lib/tests/test';
import { TestStatus } from '../../lib/testStatus';
import { CompositeReport } from '../../lib/reporting/report/compositeReport';
import { SuccessfulTestReport } from '../../lib/reporting/report/successfulTestReport';
import { FailedTestReport } from '../../lib/reporting/report/failedTestReport';
import { SkippedTestReport } from '../../lib/reporting/report/skippedTestReport';
import { Report } from '../../lib/reporting/report/report';
import { LeafReport } from '../../lib/reporting/report/leafReport';


@TestSuite('Test Runner Visitor Tests')
export class TestRunnerVisitorTests {

    private testRunnerVisitor: TestRunnerVisitor;

    @BeforeEach()
    beforeEach() {
        this.testRunnerVisitor = new TestRunnerVisitor();
    }

    @Test('Simple test suite')
    async simpleTestSuite() {
        // Arrange
        const testSuite = new TestSuiteInstance();
        testSuite.name = 'myTestSuite';
        testSuite.set('testA', new TestInstance('testA', () => { }, TestStatus.Normal));
        testSuite.set('testB', new TestInstance('testB', () => { }, TestStatus.Normal));

        const expectedReport = new CompositeReport('myTestSuite');
        expectedReport.addReport(new SuccessfulTestReport('testA', 0));
        expectedReport.addReport(new SuccessfulTestReport('testB', 0));

        // Act
        const actualReport = await testSuite.accept(this.testRunnerVisitor);

        // Assert
        this.expectReportsToBeEqual(actualReport, expectedReport);
    }

    @Test('Test suite with failure')
    async testSuiteWithFailure() {
        // Arrange
        const testSuite = new TestSuiteInstance();
        testSuite.name = 'myTestSuite';
        testSuite.set('testA', new TestInstance('testA', () => { }, TestStatus.Normal));
        testSuite.set('testB', new TestInstance('testB', () => { throw new Error('oops'); }, TestStatus.Normal));

        const expectedReport = new CompositeReport('myTestSuite');
        expectedReport.addReport(new SuccessfulTestReport('testA', 0));
        expectedReport.addReport(new FailedTestReport('testB', 'oops', 0));

        // Act
        const actualReport = await testSuite.accept(this.testRunnerVisitor);

        // Assert
        this.expectReportsToBeEqual(actualReport, expectedReport);
    }

    @Test('Test suite with skipped tests')
    async testSuiteWithSkippedTests() {
        // Arrange
        const testSuite = new TestSuiteInstance();
        testSuite.name = 'myTestSuite';
        testSuite.set('testA', new TestInstance('testA', () => { }, TestStatus.Ignored));
        testSuite.set('testB', new TestInstance('testB', () => { }, TestStatus.Normal));

        const expectedReport = new CompositeReport('myTestSuite');
        expectedReport.addReport(new SkippedTestReport('testA'));
        expectedReport.addReport(new SuccessfulTestReport('testB', 0));

        // Act
        const actualReport = await testSuite.accept(this.testRunnerVisitor);

        // Assert
        this.expectReportsToBeEqual(actualReport, expectedReport);
    }

    @Test('Test suite with focused tests')
    async testSuiteWithFocusedTests() {
        // Arrange
        const testSuite = new TestSuiteInstance();
        testSuite.name = 'myTestSuite';
        testSuite.set('testA', new TestInstance('testA', () => { }, TestStatus.Focused));
        testSuite.set('testB', new TestInstance('testB', () => { }, TestStatus.Normal));

        const subTestSuite = new TestSuiteInstance();
        subTestSuite.name = 'subTestSuite';
        subTestSuite.set('testC1', new TestInstance('testC1', () => { }, TestStatus.Normal));
        subTestSuite.set('testC2', new TestInstance('testC2', () => { }, TestStatus.Normal));

        const expectedReport = new CompositeReport('myTestSuite');
        expectedReport.addReport(new SuccessfulTestReport('testA', 0));
        expectedReport.addReport(new SkippedTestReport('testB'));

        const expectedSubReport = new CompositeReport('subTestSui te');
        expectedSubReport.addReport(new SkippedTestReport('testC1'));
        expectedSubReport.addReport(new SkippedTestReport('testC2'));

        // Act
        const actualReport = await testSuite.accept(this.testRunnerVisitor);

        // Assert
        this.expectReportsToBeEqual(actualReport, expectedReport);
    }

    expectReportsToBeEqual(actualReport: Report, expectedReport: Report) {
        this.expectSameType(actualReport, expectedReport);
        expect.toBeEqual(actualReport.result, expectedReport.result);
        expect.toBeEqual(actualReport.name, expectedReport.name);

        if (actualReport instanceof FailedTestReport) {
            expect.toBeEqual(actualReport.message, (expectedReport as FailedTestReport).message);
        }

        if (actualReport instanceof LeafReport) return;

        const actualChildren = (actualReport as CompositeReport).getChildren();
        const expectedChildren = (expectedReport as CompositeReport).getChildren();

        for (const i in actualChildren) {
            this.expectReportsToBeEqual(actualChildren[i], expectedChildren[i]);
        }
    }

    expectSameType(actualReport: any, expectedReport: any) {
        return expect.toBeEqual(actualReport.constructor, expectedReport.constructor);
    }
}