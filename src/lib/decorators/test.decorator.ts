import { TestCase } from '../testCase';
import { TestSuiteMetadata } from './testSuiteMetadata';

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
        assertTestIsUnique(name, target);
        const metadata = TestSuiteMetadata.getMetadataStore(target);
        metadata.tests[name] = generateTest(name, testCases, descriptor.value, timeout);
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
        assertTestIsUnique(name, target);
        const metadata = TestSuiteMetadata.getMetadataStore(target);
        metadata.focusedTests[name] = generateTest(name, testCases, descriptor.value, timeout);
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
        const metadata = TestSuiteMetadata.getMetadataStore(target);
        metadata.ignoredTests.push(name);
    };
}

function initializeTarget(target: any) {
    if (!target.tests) { target.tests = {}; }
    if (!target.focusedTests) { target.focusedTests = {}; }
    if (!target.ignoredTests) { target.ignoredTests = []; }
}

function assertTestIsUnique(name: string, target: any) {
    if (target.focusedTests[name] === undefined && target.tests[name] === undefined)
        return;

    throw new Error(`A test named "${name}" is already registered. Copy pasta much?`);
}

function generateTest(name: string, testCases: TestCase[], testMethod: any, timeout: number) {
    return testCases
        ? decorateTestWithTestcases(testMethod, testCases, timeout)
        : decorateStandaloneTest(testMethod, timeout);
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

function decorateTestWithTestcases(testMethod: Function, testCases: TestCase[], timeout: number) {
    const tests: { [name: string]: Function } = {};
    for (const testCase of testCases) {
        tests[testCase.name] = async (context: any) => {
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

    return tests;
}