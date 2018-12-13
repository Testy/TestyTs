import { test, expect, testSuite, ftest } from '../../../testyCore';
import { TestResult } from '../../../lib/reporting/report/testResult';
import { Logger } from '../../../lib/logger/logger';
import { NullLogger } from '../../utils/nullLogger';
import { TestsRunnerVisitor } from '../../../lib/tests/visitors/runnerVisitor';
import { TestsLoader } from '../../../lib/utils/testsLoader';
import { beforeEach } from '../../../lib/decorators/beforeEach.decorator';

@testSuite('Test Decorator Test Suite')
export class TestDecoratorTestSuite {
    private testsLoader: TestsLoader;
    private logger: Logger = new NullLogger();
    private visitor = new TestsRunnerVisitor(this.logger);

    @beforeEach()
    beforeEach() {
        this.testsLoader = new TestsLoader();
    }

    // @test('single test, test should be ran once')
    // private async singleTest() {
    //     // Arrange
    //     const testSuite = await this.testsLoader.loadTests('', ['testDecoratorTestSuite.ts'], undefined);

    //     // Act
    //     const report = await testSuite.accept(this.visitor);

    //     // Assert
    //     expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
    // }

    // @test('multiple test, tests should be ran once')
    // private async multipleTest() {
    //     // Arrange
    //     const testSuite = await this.testsLoader.loadTests('./', ['multipleTestsTestDecoratorTestSuite.ts'], undefined);

    //     // Act
    //     const report = await testSuite.accept(this.visitor);

    //     // Assert
    //     expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
    //     expect.toBeEqual(testSuite.context.numberOfRunsTest2, 1);
    //     expect.toBeEqual(testSuite.context.numberOfRunsTest3, 1);
    // }

    // @test('test cases, tests should be ran once')
    // private async testCasesTest() {
    //     // Arrange
    //     const testSuite = await this.testsLoader.loadTests('./', ['testCasesTestDecoratorTestSuite.ts'], undefined);

    //     // Act
    //     const report = await testSuite.accept(this.visitor);

    //     // Assert
    //     expect.toBeEqual(testSuite.context.numberOfRunsTest1, 1);
    //     expect.toBeEqual(testSuite.context.numberOfRunsTest2, 1);
    //     expect.toBeEqual(testSuite.context.numberOfRunsTest3, 1);
    // }

    // @test('test takes too long, should return failed test report')
    // private async timeoutTest() {
    //     // Arrange
    //     const testSuite = await this.testsLoader.loadTests('./', ['timeoutTestDecoratorTestSuite.ts'], undefined);

    //     // Act
    //     const report = await testSuite.accept(this.visitor);

    //     // Assert
    //     expect.toBeEqual(report.result, TestResult.Failure);
    // }

    @test('no names, should infer from method names')
    private async noNameTest() {
        // Arrange
        const testSuite = await this.testsLoader.loadTests(__dirname, ['testWithoutNames.ts'], undefined);

        // Act

        // Assert
    }
}