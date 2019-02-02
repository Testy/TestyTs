import { expect } from '@testy/assertion';
import { TestSuiteInstance } from '../../../lib/tests/testSuite';
import { Test, TestSuite } from '../../../testyCore';
import { TestUtils } from '../../utils/testUtils';
import { AsyncTests } from './asyncTests';
import { MultipleTestTestDecoratorTestSuite } from './multipleTestsTestDecoratorTestSuite';
import { SingleTestTestDecoratorTestSuite } from './singleTestTestDecoratorTestSuite';
import { TestCasesTestDecoratorTestSuite } from './testCasesTestDecoratorTestSuite';
import { TestWithNoNamesTestSuite } from './testWithoutNames';

@TestSuite('Test Decorator Test Suite')
export class TestDecoratorTestSuite {

    @Test('single test, test should be in test suite once')
    private singleTest() {
        // Arrange
        const testSuite = TestUtils.getInstance(SingleTestTestDecoratorTestSuite);

        // Assert
        expect.toBeEqual(testSuite.testIds.length, 1);
        expect.toBeIn('My single test', testSuite.testIds);
    }

    @Test('multiple test, tests should be test suite once')
    private multipleTest() {
        // Arrange
        const testSuite = TestUtils.getInstance(MultipleTestTestDecoratorTestSuite);

        // Assert
        expect.toBeEqual(testSuite.testIds.length, 3);
        expect.toBeIn('My first test', testSuite.testIds);
        expect.toBeIn('My second test', testSuite.testIds);
        expect.toBeIn('My third test', testSuite.testIds);
    }

    @Test('test cases, tests should be test suite once')
    private testCasesTest() {
        // Arrange
        const testSuite = TestUtils.getInstance(TestCasesTestDecoratorTestSuite);

        // Assert
        expect.toBeEqual(testSuite.testIds.length, 1);
        expect.toBeIn('My test with test cases', testSuite.testIds);

        const subTestSuite = testSuite.get('My test with test cases') as TestSuiteInstance;
        expect.toBeIn('My first test', subTestSuite.testIds);
        expect.toBeIn('My second test', subTestSuite.testIds);
        expect.toBeIn('My third test', subTestSuite.testIds);
    }

    @Test('no names, should infer from method names')
    private noNameTest() {
        // Arrange
        const testSuite = TestUtils.getInstance(TestWithNoNamesTestSuite);

        // Assert
        expect.toBeIn('myTest1', testSuite.testIds);
        expect.toBeIn('myTest2', testSuite.testIds);
        expect.toBeIn('myTest3', testSuite.testIds);

        const myTest3 = testSuite.get('myTest3') as TestSuiteInstance;
        expect.toBeIn('myTestCase1', myTest3.testIds);
        expect.toBeIn('myTestCase2', myTest3.testIds);
        expect.toBeIn('myTestCase3', myTest3.testIds);
    }

    @Test('async tests', undefined, 5000)
    private async asyncTest() {
        // Arrange
        const testSuite = TestClassUtils.getInstance(AsyncTests);

        // Assert
    }