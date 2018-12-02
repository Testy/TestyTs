import { TestCase } from '../testCase';
import { TestStatus } from '../testStatus';
import { Test } from '../tests/test';
import { TestSuite } from '../tests/testSuite';

/**
 * Marks a method inside a @testSuite decorated class as a test.
 *
 * @param name Name of the test, displayed in the test report.
 * @param testCases Allows to run the test multiple times with different arguments. Arguments will be passed to the test class.
 * @param timeout The test will automaticlaly fail if it has been running for longer than the specified timeout.
 */
export function test(name: string, testCases?: TestCase[], timeout: number = 2000) {
    return (target, key, descriptor) => {
        initializeTarget(target);
        const testSuiteInstance: TestSuite = target.__testSuiteInstance;
        if (testSuiteInstance.has(name)) {
            throw new Error(`A test named "${name}" is already registered. Copy pasta much?`);
        }

        testSuiteInstance.set(name, generateTest(name, testCases, TestStatus.Normal, descriptor.value, timeout));
    };
}

/**
 * Marks a method inside a @testSuite decorated class as a focused test.
 * If one or more tests are marked as focused, only those will be ran.
 *
 * @param name Name of the test, displayed in the test report.
 * @param testCases Allows to run the test multiple times with different arguments. Arguments will be passed to the test class.
 * @param timeout The test will automaticlaly fail if it has been running for longer than the specified timeout.
 */
export function ftest(name: string, testCases?: TestCase[], timeout: number = 2000) {
    return (target, key, descriptor) => {
        initializeTarget(target);
        const testSuiteInstance: TestSuite = target.__testSuiteInstance;
        if (testSuiteInstance.has(name)) {
            throw new Error(`A test named "${name}" is already registered. Copy pasta much?`);
        }

        testSuiteInstance.set(name, generateTest(name, testCases, TestStatus.Focused, descriptor.value, timeout));
    };
}

/** 
 * Marks a method inside a @testSuite decorated class as an ignored test.
 * Ignored tests will not be ran, but they will still appear in test reports.
 * 
 * @param name Name of the test, displayed in the test report.
 * @param testCases Allows to run the test multiple times with different arguments. Arguments will be passed to the test class.
 * @param timeout The test will automaticlaly fail if it has been running for longer than the specified timeout.
 */
export function xtest(name: string, testCases?: TestCase[], timeout: number = 2000) {
    return (target, key, descriptor) => {
        initializeTarget(target);
        const testSuiteInstance: TestSuite = target.__testSuiteInstance;
        if (testSuiteInstance.has(name)) {
            throw new Error(`A test named "${name}" is already registered. Copy pasta much?`);
        }

        testSuiteInstance.set(name, generateTest(name, testCases, TestStatus.Ignored, descriptor.value, timeout));
    };
}

function initializeTarget(target: any) {
    if (!target.__testSuiteInstance) { target.__testSuiteInstance = new TestSuite(); }
}

function generateTest(name: string, testCases: TestCase[], status: TestStatus, testMethod: Function, timeout: number): Test | TestSuite {
    return testCases
        ? generateTestsFromTestcases(name, testMethod, testCases, status, timeout)
        : new Test(name, decorateStandaloneTest(testMethod, timeout), status);
}

function generateTestsFromTestcases(name: string, testMethod: Function, testCases: TestCase[], status: TestStatus, timeout: number): TestSuite {
    const tests = new TestSuite();
    tests.name = name;
    for (const testCase of testCases) {
        const decoratedTestMethod = decorateTestWithTestcase(testMethod, testCase, timeout);
        tests.set(testCase.name, new Test(testCase.name, decoratedTestMethod, status));
    }

    return tests;
}

function decorateStandaloneTest(testMethod: Function, timeout: number) {
    return async (context: any) => {
        await new Promise(async (resolve, reject) => {
            setTimeout(() => reject('Test has timed out.'), timeout);
            try {
                await testMethod.bind(context)();
            }
            catch (err) {
                reject(err);
            }

            resolve();
        });
    };
}

function decorateTestWithTestcase(testMethod: Function, testCase: TestCase, timeout: number) {
    return async (context: any) => {
        await new Promise(async (resolve, reject) => {
            setTimeout(() => reject('Test has timed out.'), timeout);
            try {
                await testMethod.bind(context)(...testCase.args);
            }
            catch (err) {
                reject(err);
            }

            resolve();
        });
    };
}