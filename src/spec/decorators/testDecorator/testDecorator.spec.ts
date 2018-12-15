import { test, expect, testSuite, ftest, TestResult } from '../../../testyCore';
import { Logger } from '../../../lib/logger/logger';
import { NullLogger } from '../../utils/nullLogger';
import { TestsRunnerVisitor } from '../../../lib/tests/visitors/runnerVisitor';
import { MultipleTestTestDecoratorTestSuite } from './multipleTestsTestDecoratorTestSuite';
import { TestCasesTestDecoratorTestSuite } from './testCasesTestDecoratorTestSuite';
import { TimeoutTestDecoratorTestSuite } from './timeoutTestDecoratorTestSuite';

@testSuite('Test Decorator Test Suite')
export class TestDecoratorTestSuite {
    private logger: Logger = new NullLogger();
    private visitor = new TestsRunnerVisitor(this.logger);

    @test('single test, test should be ran once')
    private async singleTest() {
        // Arrange
        const testSuite = (TestDecoratorTestSuite as any).__testSuiteInstance;

        // Act
        const report = await testSuite.accept(this.visitor);

        // Assert
        expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
    }

    @test('multiple test, tests should be ran once')
    private async multipleTest() {
        // Arrange
        const testSuite = (MultipleTestTestDecoratorTestSuite as any).__testSuiteInstance;

        // Act
        const report = await testSuite.accept(this.visitor);

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
        const report = await testSuite.accept(this.visitor);

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

    // @test('no names, should infer from method names')
    // private async noNameTest() {
    //     // Arrange
    //     const testSuite = await this.testsLoader.loadTests(__dirname, ['testWithoutNames.ts'], undefined);

    //     // Act

    //     // Assert
    // }
}