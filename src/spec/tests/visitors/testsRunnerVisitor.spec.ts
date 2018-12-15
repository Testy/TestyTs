import { testSuite } from '../../../lib/decorators/testSuite.decorator';
import { test } from '../../../lib/decorators/test.decorator';
import { TimeoutTestDecoratorTestSuite } from './timeoutTestDecoratorTestSuite';
import { TestSuite } from '../../../lib/tests/testSuite';
import { expect, TestResult } from '../../../testyCore';
import { beforeEach } from '../../../lib/decorators/beforeEach.decorator';
import { TestsRunnerVisitor } from '../../../lib/tests/visitors/testsRunnerVisitor';
import { Logger } from '../../../lib/logger/logger';
import { NullLogger } from '../../utils/nullLogger';
import { MultipleTestTestDecoratorTestSuite as MultipleTestsTestSuite } from './multipleTests';

@testSuite('Tests Runner Visitor Tests')
export class TestsRunnerVisitorTests {

    private logger: Logger;
    private visitor: TestsRunnerVisitor;

    @beforeEach()
    beforeEach() {
        this.logger = new NullLogger();
        this.visitor = new TestsRunnerVisitor(this.logger);
    }

    @test('test takes too long, should return failed test report')
    async timeoutTest() {
        // Arrange
        const testSuite = this.getTestSuiteInstance(TimeoutTestDecoratorTestSuite);

        // Act
        const report = await testSuite.accept(this.visitor);

        // Assert
        expect.toBeEqual(report.result, TestResult.Failure);
    }

    @test('multiple tests, should all be ran successfully')
    private async multipleTests() {
        // Arrange
        const testSuite = this.getTestSuiteInstance(MultipleTestsTestSuite);

        // Act
        const report = await testSuite.accept(this.visitor);

        // Assert
        expect.toBeEqual(report.result, TestResult.Success);
        expect.toBeEqual(report.numberOfSuccessfulTests, 3);
        expect.toBeEqual(report.numberOfSkippedTests, 0);
    }

    protected getTestSuiteInstance(testClass: any): TestSuite {
        return testClass.__testSuiteInstance;
    }
}