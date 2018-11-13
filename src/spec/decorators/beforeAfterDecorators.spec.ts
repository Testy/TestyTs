import { createTestSuite, testSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { TestStatus } from '../../lib/testStatus';
import { expect } from '../../testy';
import { NormalBeforeAfterTestSuite } from './dummyTestSuite/normalBeforeAfterTestSuite';
import { ThrowsDuringBeforeAllTestSuite } from './dummyTestSuite/throwsDuringBeforeAllTestSuite';
import { TestResult } from '../../lib/reporting/report/testResult';
import { TestCase } from '../../lib/testCase';
import { ThrowsDuringBeforeEachTestSuite } from './dummyTestSuite/throwsDuringBeforeEachTestSuite';
import { ThrowsDuringAfterEachTestSuite } from './dummyTestSuite/throwsDuringAfterEachTestSuite';
import { ThrowsDuringAfterAllTestSuite } from './dummyTestSuite/throwsDuringAfterAllTestSuite';

@testSuite('Before and After Decorators Test Suite')
class BeforeAfterDecoratorsTestSuite {

    @test('beforeAll, beforeEach, afterEach and afterAll are called the right amount of time.')
    private async trivialCase() {
        // Arrange
        const testSuite = createTestSuite(NormalBeforeAfterTestSuite, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        await testSuite.run();

        // Assert
        expect.toBeEqual(testSuite.context.numberOfBeforeAllExecutions, 1);
        expect.toBeEqual(testSuite.context.numberOfBeforeEachExecutions, 5);
        expect.toBeEqual(testSuite.context.numberOfAfterEachExecutions, 5);
        expect.toBeEqual(testSuite.context.numberOfAfterAllExecutions, 1);
    }

    @test('Before and after methods failures', [
        new TestCase('beforeAll throws, should return a failed test report', ThrowsDuringBeforeAllTestSuite),
        new TestCase('beforeEach throws, should return a failed test report', ThrowsDuringBeforeEachTestSuite),
        new TestCase('afterEach throws, should return a failed test report', ThrowsDuringAfterEachTestSuite),
        new TestCase('afterAll throws, should return a failed test report', ThrowsDuringAfterAllTestSuite),
    ])
    private async beforeOfAfterMethodFails(testSuiteType: any) {
        // Arrange
        const testSuite = createTestSuite(testSuiteType, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        const report = await testSuite.run();
        console.log(report);
        // Assert
        expect.toBeDefined(report);
        expect.toBeEqual(report.result, TestResult.Failure);
    }
}

