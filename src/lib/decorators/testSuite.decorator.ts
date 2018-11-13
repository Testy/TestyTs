import { TestRunner } from '../testRunner';
import { LoggerFactory } from '../logger/loggerFactory';
import { TestSuite } from '../testSuite';
import { TestSuitePropertiesAndMethodNamesError } from '../exceptions/TestSuitePropertiesAndMethodNamesError';
import { TestStatus } from '../testStatus';

const logger = LoggerFactory.create();

/** 
 * Marks a class as a test suite. 
 * 
 * @param name Name of the test suite, displayed in the test report.
 */
export function testSuite(name: string) {
    return createTestSuiteDecoratorFactory(name, TestStatus.None);
}

/** 
 * Marks a class as a focused test suite. If one or more test suites are marked as focused, only the those will be ran.
 * 
 * @param name Name of the test suite, displayed in the test report.
 */
export function ftestSuite(name: string) {
    return createTestSuiteDecoratorFactory(name, TestStatus.Focused);
}

/**
 * Marks a class as an ignored test suite. Its tests will not be ran, but will still show up in the test report.
 * 
 * @param name Name of the test suite, displayed in the test report.
 */
export function xtestSuite(name: string) {
    return createTestSuiteDecoratorFactory(name, TestStatus.Ignored);
}

function createTestSuiteDecoratorFactory(name: string, status: TestStatus) {
    return (constructor: Function) => {
        const testSuite = Object.create(constructor.prototype);
        const testSuiteBase = new TestSuite(logger);
        assertTestSuiteValidity(testSuite, testSuiteBase);

        for (const key in testSuiteBase) {
            testSuite[key] = testSuiteBase[key];
        }

        testSuite.name = name;
        testSuite.status = status;

        TestRunner.testRunner.addTestSuite(testSuite);
    };
}

/**
 * Ensures that the user did not use the same properties and method names as the TestSuite class
 */
function assertTestSuiteValidity(testSuite: any, testSuiteBase: TestSuite) {
    const testSuitePropAndMethodNames = Object.keys(testSuite.constructor.prototype);
    const basePropAndMethodNames = Object.keys(testSuiteBase.constructor.prototype);

    const conflicts = testSuitePropAndMethodNames.filter(value => -1 !== basePropAndMethodNames.indexOf(value));
    if (conflicts.length > 0) {
        throw new TestSuitePropertiesAndMethodNamesError(conflicts);
    }
}