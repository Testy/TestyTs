import { testSuite, ftestSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { beforeEach } from '../../lib/decorators/beforeEach.decorator';
import { TestRunnerVisitor } from '../../lib/tests/visitors/testRunnerVisitor';
import { TestSuite } from '../../lib/tests/testSuite';
import { Test } from '../../lib/tests/test';
import { TestStatus } from '../../lib/testStatus';
import { expect } from '../../lib/assertion/expect';
import { CompositeReport } from '../../lib/reporting/report/compositeReport';
import { SuccessfulTestReport } from '../../lib/reporting/report/successfulTestReport';
import { Report } from '../../lib/reporting/report/report';
import { LeafReport } from '../../lib/reporting/report/leafReport';
import { FailedTestReport } from '../../lib/reporting/report/failedTestReport';
import { SkippedTestReport } from '../../lib/reporting/report/skippedTestReport';

@ftestSuite('Test Runner Visitor Tests')
export class TestRunnerVisitorTests {
    private testRunnerVisitor: TestRunnerVisitor;

    @beforeEach()
    beforeEach() {
        this.testRunnerVisitor = new TestRunnerVisitor();
    }

    @test('Simple test suite')
    async simpleTestSuite() {
        // Arrange
        const testSuite = new TestSuite();
        testSuite.name = 'myTestSuite';
        testSuite.set('testA', new Test('testA', () => { }, TestStatus.Normal));
        testSuite.set('testB', new Test('testB', () => { }, TestStatus.Normal));

        const expectedReport = new CompositeReport('myTestSuite');
        expectedReport.addReport(new SuccessfulTestReport('testA', 0));
        expectedReport.addReport(new SuccessfulTestReport('testB', 0));

        // Act
        const actualReport = await testSuite.accept(this.testRunnerVisitor);

        // Assert
        this.expectReportsToBeEqual(actualReport, expectedReport);
    }

    @test('Test suite with failure')
    async testSuiteWithFailure() {
        // Arrange
        const testSuite = new TestSuite();
        testSuite.name = 'myTestSuite';
        testSuite.set('testA', new Test('testA', () => { }, TestStatus.Normal));
        testSuite.set('testB', new Test('testB', () => { throw new Error('oops'); }, TestStatus.Normal));

        const expectedReport = new CompositeReport('myTestSuite');
        expectedReport.addReport(new SuccessfulTestReport('testA', 0));
        expectedReport.addReport(new FailedTestReport('testB', 'oops', 0));

        // Act
        const actualReport = await testSuite.accept(this.testRunnerVisitor);

        // Assert
        this.expectReportsToBeEqual(actualReport, expectedReport);
    }

    @test('Test suite with skipped tests')
    async testSuiteWithSkippedTests() {
        // Arrange
        const testSuite = new TestSuite();
        testSuite.name = 'myTestSuite';
        testSuite.set('testA', new Test('testA', () => { }, TestStatus.Ignored));
        testSuite.set('testB', new Test('testB', () => { }, TestStatus.Normal));

        const expectedReport = new CompositeReport('myTestSuite');
        expectedReport.addReport(new SkippedTestReport('testA'));
        expectedReport.addReport(new SuccessfulTestReport('testB', 0));

        // Act
        const actualReport = await testSuite.accept(this.testRunnerVisitor);

        // Assert
        this.expectReportsToBeEqual(actualReport, expectedReport);
    }

    @test('Test suite with focused tests')
    async testSuiteWithFocusedTests() {
        // Arrange
        const testSuite = new TestSuite();
        testSuite.name = 'myTestSuite';
        testSuite.set('testA', new Test('testA', () => { }, TestStatus.Focused));
        testSuite.set('testB', new Test('testB', () => { }, TestStatus.Normal));

        const subTestSuite = new TestSuite();
        subTestSuite.name = 'subTestSuite';
        subTestSuite.set('testC1', new Test('testC1', () => { }, TestStatus.Normal));
        subTestSuite.set('testC2', new Test('testC2', () => { }, TestStatus.Normal));

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