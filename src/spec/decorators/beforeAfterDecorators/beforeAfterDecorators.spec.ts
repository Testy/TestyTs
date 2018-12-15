import { test } from '../../../lib/decorators/test.decorator';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';
import { Logger } from '../../../lib/logger/logger';
import { TestsRunnerVisitor } from '../../../lib/tests/visitors/runnerVisitor';
import { expect, TestCase, TestResult } from '../../../testyCore';
import { NullLogger } from '../../utils/nullLogger';
import { NormalBeforeAfterTestSuite } from './normalBeforeAfterTestSuite';
import { ThrowsDuringBeforeAllTestSuite } from './throwsDuringBeforeAllTestSuite';
import { ThrowsDuringBeforeEachTestSuite } from './throwsDuringBeforeEachTestSuite';
import { ThrowsDuringAfterEachTestSuite } from './throwsDuringAfterEachTestSuite';
import { ThrowsDuringAfterAllTestSuite } from './throwsDuringAfterAllTestSuite';


@testSuite('Before and After Decorators Test Suite')
export class BeforeAfterDecoratorsTestSuite {
    private logger: Logger = new NullLogger();
    private visitor = new TestsRunnerVisitor(this.logger);

    @test('beforeAll, beforeEach, afterEach and afterAll are called the right amount of time.')
    private async trivialCase() {
        // Arrange
        const testSuite = (NormalBeforeAfterTestSuite as any).__testSuiteInstance;

        // Act
        const report = await testSuite.accept(this.visitor);

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
        const testSuite = testSuiteType.__testSuiteInstance;

        // Act
        const report = await testSuite.accept(this.visitor);

        // Assert
        expect.toBeDefined(report);
        expect.toBeEqual(report.result, TestResult.Failure);
        expect.toBeEqual(report.numberOfTests, numberOfTests, 'Expected all tests to be part of the report.');
    }
}

