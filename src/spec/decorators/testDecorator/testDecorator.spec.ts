import { testSuite, createTestSuite, ftestSuite } from '../../../lib/decorators/testSuite.decorator';
import { test } from '../../../lib/decorators/test.decorator';
import { TestStatus } from '../../../lib/testStatus';
import { expect } from '../../../testy';
import { TestResult } from '../../../lib/reporting/report/testResult';
import { SingleTestTestDecoratorTestSuite } from './testDecoratorTestSuite';
import { MultipleTestTestDecoratorTestSuite } from './multipleTestsTestDecoratorTestSuite';
import { TestCasesTestDecoratorTestSuite } from './testCasesTestDecoratorTestSuite';
import { TimeoutTestDecoratorTestSuite } from './timeoutTestDecoratorTestSuite';

@testSuite('Test Decorator Test Suite')
export class TestDecoratorTestSuite {

    @test('single test, test should be ran once')
    private async singleTest() {
        // Arrange
        const testSuite = createTestSuite(SingleTestTestDecoratorTestSuite, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        const report = await testSuite.run();

        // Assert
        expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
    }

    @test('multiple test, tests should be ran once')
    private async multipleTest() {
        // Arrange
        const testSuite = createTestSuite(MultipleTestTestDecoratorTestSuite, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        const report = await testSuite.run();

        // Assert
        expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
        expect.toBeEqual(testSuite.context.numberOfRunsTest2, 1);
        expect.toBeEqual(testSuite.context.numberOfRunsTest3, 1);
    }

    @test('test cases, tests should be ran once')
    private async testCasesTest() {
        // Arrange
        const testSuite = createTestSuite(TestCasesTestDecoratorTestSuite, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        const report = await testSuite.run();

        // Assert
        expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
        expect.toBeEqual(testSuite.context.numberOfRunsTest2, 1);
        expect.toBeEqual(testSuite.context.numberOfRunsTest3, 1);
    }

    @test('test takes too long, should return failed test report')
    private async timeoutTest() {
        // Arrange
        const testSuite = createTestSuite(TimeoutTestDecoratorTestSuite, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        const report = await testSuite.run();

        // Assert
        expect.toBeEqual(report.result, TestResult.Failure);
    }
}