import { test } from '../../../lib/decorators/test.decorator';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';
import { expect, TestCase, TestResult, beforeEach } from '../../../testyCore';
import { NormalBeforeAfterTestSuite } from './normalBeforeAfterTestSuite';
import { ThrowsDuringBeforeAllTestSuite } from './throwsDuringBeforeAllTestSuite';
import { ThrowsDuringBeforeEachTestSuite } from './throwsDuringBeforeEachTestSuite';
import { ThrowsDuringAfterEachTestSuite } from './throwsDuringAfterEachTestSuite';
import { ThrowsDuringAfterAllTestSuite } from './throwsDuringAfterAllTestSuite';
import { NullLogger } from '../../utils/nullLogger';
import { Logger } from '../../../lib/logger/logger';
import { TestsVisitor } from '../../../lib/tests/visitors/testVisitor';
import { Report } from '../../../lib/reporting/report/report';
import { TestsRunnerVisitor } from '../../../lib/tests/visitors/testsRunnerVisitor';
import { TestSuite } from '../../../lib/tests/testSuite';


@testSuite('Before and After Decorators Test Suite')
export class BeforeAfterDecoratorsTestSuite {
    // TODO: This test suite should extend TestSuiteTestsBase when #8 is fixed.
    private logger: Logger = new NullLogger();
    protected visitor: TestsVisitor<Report>;

    @beforeEach()
    private beforeEach() {
        this.visitor = new TestsRunnerVisitor(this.logger);
    }

    @test('beforeAll, beforeEach, afterEach and afterAll are called the right amount of time.')
    private async trivialCase() {
        // Arrange
        const testSuite = this.getTestSuiteInstance(NormalBeforeAfterTestSuite);

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
    private async beforeOfAfterMethodFails(testSuiteClass: any, numberOfTests: number) {
        // Arrange
        const testSuite = this.getTestSuiteInstance(testSuiteClass);

        // Act
        const report = await testSuite.accept(this.visitor);

        // Assert
        expect.toBeDefined(report);
        expect.toBeEqual(report.result, TestResult.Failure);
        expect.toBeEqual(report.numberOfTests, numberOfTests, 'Expected all tests to be part of the report.');
    }

    protected getTestSuiteInstance(testClass: any): TestSuite {
        return testClass.__testSuiteInstance;
    }
}

