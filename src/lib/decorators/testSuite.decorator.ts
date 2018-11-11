import { TestRunner } from '../testRunner';
import { LoggerFactory } from '../logger/loggerFactory';
import { TestFlags, TestSuite } from '../interfaces/testSuite';
import { TestSuitePropertiesAndMethodNamesError } from '../exceptions/TestSuitePropertiesAndMethodNamesError';

const logger = LoggerFactory.create();

export function testSuite(name: string) {
    return createTestSuiteDecoratorFactory(name, TestFlags.None);
}

export function ftestSuite(name: string) {
    return createTestSuiteDecoratorFactory(name, TestFlags.Focused);
}

export function xtestSuite(name: string) {
    return createTestSuiteDecoratorFactory(name, TestFlags.Ignored);
}

function createTestSuiteDecoratorFactory(name: string, flag: TestFlags) {
    return (constructor: Function) => {
        const testSuite = Object.create(constructor.prototype);
        const testSuiteBase = new TestSuite(logger);
        assertTestSuiteValidity(testSuite, testSuiteBase);

        for (const key in testSuiteBase) {
            testSuite[key] = testSuiteBase[key];
        }

        testSuite.name = name;
        testSuite.flag = flag;

        TestRunner.testRunner.addTestSuite(testSuite);
    }
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