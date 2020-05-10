import { CompositeReport } from '../../lib/reporting/report/compositeReport';
import { FailedTestReport } from '../../lib/reporting/report/failedTestReport';
import { SkippedTestReport } from '../../lib/reporting/report/skippedTestReport';
import { SuccessfulTestReport } from '../../lib/reporting/report/successfulTestReport';
import { TestInstance } from '../../lib/tests/test';
import { TestSuiteInstance } from '../../lib/tests/testSuite';
import { TestRunnerVisitor } from '../../lib/tests/visitors/testRunnerVisitor';
import { TestStatus } from '../../lib/testStatus';
import { BeforeEach, Test, TestSuite } from '../../testyCore';
import { getProcessMock, ProcessMock } from '../utils/processMock';
import { TestUtils } from '../utils/testUtils';


@TestSuite('Test Runner Visitor Tests')
export class TestRunnerVisitorTests {

    private testRunnerVisitor: TestRunnerVisitor;
    private processMock: ProcessMock;

    @BeforeEach()
    beforeEach() {
        this.processMock = getProcessMock();
        this.testRunnerVisitor = new TestRunnerVisitor(this.processMock);
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
        TestUtils.expectReportsToBeEqual(actualReport, expectedReport);
        this.processMock.expectSuccess();
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
        TestUtils.expectReportsToBeEqual(actualReport, expectedReport);
        this.processMock.expectFailure();
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
        TestUtils.expectReportsToBeEqual(actualReport, expectedReport);
        this.processMock.expectSuccess();
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
        TestUtils.expectReportsToBeEqual(actualReport, expectedReport);
        this.processMock.expectSuccess();
    }
}