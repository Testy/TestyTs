import { test } from '../../../lib/decorators/test.decorator';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';
import { Logger } from '../../../lib/logger/logger';
import { TestResult } from '../../../lib/reporting/report/testResult';
import { TestCase } from '../../../lib/testCase';
import { TestsRunnerVisitor } from '../../../lib/tests/visitors/runnerVisitor';
import { TestStatus } from '../../../lib/testStatus';
import { expect, beforeEach } from '../../../testyCore';
import { NullLogger } from '../../utils/nullLogger';
import { NormalBeforeAfterTestSuite } from './normalBeforeAfterTestSuite';
import { ThrowsDuringAfterAllTestSuite } from './throwsDuringAfterAllTestSuite';
import { ThrowsDuringAfterEachTestSuite } from './throwsDuringAfterEachTestSuite';
import { ThrowsDuringBeforeAllTestSuite } from './throwsDuringBeforeAllTestSuite';
import { ThrowsDuringBeforeEachTestSuite } from './throwsDuringBeforeEachTestSuite';
import { TestsLoader } from '../../../lib/utils/testsLoader';

@testSuite('Before and After Decorators Test Suite')
export class BeforeAfterDecoratorsTestSuite {
    private testsLoader: TestsLoader;
    private logger: Logger = new NullLogger();
    private visitor = new TestsRunnerVisitor(this.logger);

    @beforeEach()
    beforeEach() {
        this.testsLoader = new TestsLoader();
    }

    @test('beforeAll, beforeEach, afterEach and afterAll are called the right amount of time.')
    private async trivialCase() {
        // Arrange
        const testSuite = await this.testsLoader.loadTests('./', ['beforeAfterDecorators.spec.ts'], undefined);

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
        new TestCase('beforeAll throws, should return a failed test report',  'throwsDuringBeforeAllTestSuite.ts', 6),
        new TestCase('beforeEach throws, should return a failed test report', 'throwsDuringBeforeEachTestSuite.ts', 6),
        new TestCase('afterEach throws, should return a failed test report', 'throwsDuringAfterEachTestSuite.ts', 6),
        new TestCase('afterAll throws, should return a failed test report', 'throwsDuringAfterAllTestSuite.ts', 6),
    ])
    private async beforeOfAfterMethodFails(testFile: any, numberOfTests: number) {
        // Arrange
        const testSuite = await this.testsLoader.loadTests('./', [testFile], undefined);

        // Act
        const report = await testSuite.accept(this.visitor);

        // Assert
        expect.toBeDefined(report);
        expect.toBeEqual(report.result, TestResult.Failure);
        expect.toBeEqual(report.numberOfTests, numberOfTests, 'Expected all tests to be part of the report.');
    }
}

