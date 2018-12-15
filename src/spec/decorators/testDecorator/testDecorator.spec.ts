import { TestSuite } from '../../../lib/tests/testSuite';
import { expect, test, testSuite } from '../../../testyCore';
import { MultipleTestTestDecoratorTestSuite } from './multipleTestsTestDecoratorTestSuite';
import { SingleTestTestDecoratorTestSuite } from './singleTestTestDecoratorTestSuite';
import { TestCasesTestDecoratorTestSuite } from './testCasesTestDecoratorTestSuite';
import { TestWithNoNamesTestSuite } from './testWithoutNames';

@testSuite('Test Decorator Test Suite')
export class TestDecoratorTestSuite {

    @test('single test, test should be ran once')
    private singleTest() {
        // Arrange
        const testSuite = this.getTestSuiteInstance(SingleTestTestDecoratorTestSuite);

        // Assert
        expect.toBeEqual(testSuite.testIds.length, 1);
        expect.toBeIn('My single test', testSuite.testIds);
    }

    @test('multiple test, tests should be ran once')
    private multipleTest() {
        // Arrange
        const testSuite = this.getTestSuiteInstance(MultipleTestTestDecoratorTestSuite);

        // Assert
        expect.toBeEqual(testSuite.testIds.length, 3);
        expect.toBeIn('My first test', testSuite.testIds);
        expect.toBeIn('My second test', testSuite.testIds);
        expect.toBeIn('My third test', testSuite.testIds);
    }

    @test('test cases, tests should be ran once')
    private testCasesTest() {
        // Arrange
        const testSuite = this.getTestSuiteInstance(TestCasesTestDecoratorTestSuite);

        // Assert
        expect.toBeEqual(testSuite.testIds.length, 1);
        expect.toBeIn('My test with test cases', testSuite.testIds);

        const subTestSuite = testSuite.get('My test with test cases') as TestSuite;
        expect.toBeIn('My first test', subTestSuite.testIds);
        expect.toBeIn('My second test', subTestSuite.testIds);
        expect.toBeIn('My third test', subTestSuite.testIds);
    }

    @test('no names, should infer from method names')
    private noNameTest() {
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