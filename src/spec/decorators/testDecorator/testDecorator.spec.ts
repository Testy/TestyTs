import { test, expect, testSuite, TestResult, beforeEach } from '../../../testyCore';
import { MultipleTestTestDecoratorTestSuite } from './multipleTestsTestDecoratorTestSuite';
import { TestCasesTestDecoratorTestSuite } from './testCasesTestDecoratorTestSuite';
import { TimeoutTestDecoratorTestSuite } from './timeoutTestDecoratorTestSuite';
import { TestWithNoNamesTestSuite } from './testWithoutNames';
import { NullLogger } from '../../utils/nullLogger';
import { Logger } from '../../../lib/logger/logger';
import { TestsVisitor } from '../../../lib/tests/visitors/testVisitor';
import { Report } from '../../../lib/reporting/report/report';
import { TestsRunnerVisitor } from '../../../lib/tests/visitors/runnerVisitor';
import { TestSuite } from '../../../lib/tests/testSuite';
import { SingleTestTestDecoratorTestSuite } from './singleTestTestDecoratorTestSuite';
import { FailedTestsReportVisitor } from '../../../lib/tests/visitors/failedTestsReportVisitor';

@testSuite('Test Decorator Test Suite')
export class TestDecoratorTestSuite {
    // TODO: This test suite should extend TestSuiteTestsBase when #8 is fixed.
    private logger: Logger = new NullLogger();
    protected visitor: TestsVisitor<Report>;

    @beforeEach()
    private beforeEach() {
        this.visitor = new TestsRunnerVisitor(this.logger);
    }

    @test('single test, test should be ran once')
    private async singleTest() {
        // Arrange
        const testSuite = (SingleTestTestDecoratorTestSuite as any).__testSuiteInstance;

        // Act
        await testSuite.accept(this.visitor);

        // Assert
        expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
    }

    @test('multiple test, tests should be ran once')
    private async multipleTest() {
        // Arrange
        const testSuite = (MultipleTestTestDecoratorTestSuite as any).__testSuiteInstance;

        // Act
        await testSuite.accept(this.visitor);

        // Assert
        expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
        expect.toBeEqual(testSuite.context.numberOfRunsTest2, 1);
        expect.toBeEqual(testSuite.context.numberOfRunsTest3, 1);
    }

    @test('test cases, tests should be ran once')
    private async testCasesTest() {
        // Arrange
        const testSuite = (TestCasesTestDecoratorTestSuite as any).__testSuiteInstance;

        // Act
        await testSuite.accept(this.visitor);

        // Assert
        expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
        expect.toBeEqual(testSuite.context.numberOfRunsTest2, 1);
        expect.toBeEqual(testSuite.context.numberOfRunsTest3, 1);
    }

    @test('test takes too long, should return failed test report')
    private async timeoutTest() {
        // Arrange
        const testSuite = (TimeoutTestDecoratorTestSuite as any).__testSuiteInstance;

        // Act
        const report = await testSuite.accept(this.visitor);

        // Assert
        expect.toBeEqual(report.result, TestResult.Failure);
    }

    @test('no names, should infer from method names')
    private async noNameTest() {
        // Arrange
        const testSuite = this.getTestSuiteInstance(TestWithNoNamesTestSuite);

        // Assert
        expect.toBeIn('myTest1', testSuite.testIds);
        expect.toBeIn('myTest2', testSuite.testIds);
        expect.toBeIn('myTest3', testSuite.testIds);

        const myTest3 = testSuite.get('myTest3') as TestSuite;
        expect.toBeIn('myTestCase1', myTest3.testIds);
        expect.toBeIn('myTestCase2', myTest3.testIds);
        expect.toBeIn('myTestCase3', myTest3.testIds);
    }

    protected getTestSuiteInstance(testClass: any): TestSuite {
        return testClass.__testSuiteInstance;
    }
}