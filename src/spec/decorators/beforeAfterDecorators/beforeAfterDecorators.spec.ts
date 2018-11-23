import { test } from '../../../lib/decorators/test.decorator';
import { createTestSuite, testSuite } from '../../../lib/decorators/testSuite.decorator';
import { TestResult } from '../../../lib/reporting/report/testResult';
import { TestCase } from '../../../lib/testCase';
import { TestStatus } from '../../../lib/testStatus';
import { expect } from '../../../testyCore';
import { NormalBeforeAfterTestSuite } from './normalBeforeAfterTestSuite';
import { ThrowsDuringBeforeAllTestSuite } from './throwsDuringBeforeAllTestSuite';
import { ThrowsDuringBeforeEachTestSuite } from './throwsDuringBeforeEachTestSuite';
import { ThrowsDuringAfterEachTestSuite } from './throwsDuringAfterEachTestSuite';
import { ThrowsDuringAfterAllTestSuite } from './throwsDuringAfterAllTestSuite';

@testSuite('Before and After Decorators Test Suite')
class BeforeAfterDecoratorsTestSuite {

    @test('beforeAll, beforeEach, afterEach and afterAll are called the right amount of time.')
    private async trivialCase() {
        // Arrange
        const testSuite = createTestSuite(NormalBeforeAfterTestSuite, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        const report = await testSuite.run();

        // Assert
        expect.toBeEqual(testSuite.context.numberOfBeforeAllExecutions, 1);
        expect.toBeEqual(testSuite.context.numberOfBeforeEachExecutions, 5);
        expect.toBeEqual(testSuite.context.numberOfAfterEachExecutions, 5);
        expect.toBeEqual(testSuite.context.numberOfAfterAllExecutions, 1);
        expect.toBeEqual(report.numberOfTests, 6);
    }

    @test('Before and after methods failures', [
        new TestCase('beforeAll throws, should return a failed test report', ThrowsDuringBeforeAllTestSuite, 6),
        new TestCase('beforeEach throws, should return a failed test report', ThrowsDuringBeforeEachTestSuite, 6),
        new TestCase('afterEach throws, should return a failed test report', ThrowsDuringAfterEachTestSuite, 6),
        new TestCase('afterAll throws, should return a failed test report', ThrowsDuringAfterAllTestSuite, 6),
    ])
    private async beforeOfAfterMethodFails(testSuiteType: any, numberOfTests: number) {
        // Arrange
        const testSuite = createTestSuite(testSuiteType, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        const report = await testSuite.run();

        // Assert
        expect.toBeDefined(report);
        expect.toBeEqual(report.result, TestResult.Failure);
        expect.toBeEqual(report.numberOfTests, numberOfTests, 'Expected all tests to be part of the report.');
    }
}

