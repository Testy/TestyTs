import { TestCase } from '../testCase';

/**
 * Marks a method inside a @testSuite decorated class as a test.
 *
 * @param name Name of the test, displayed in the test report.
 * @param testCases Allows to run the test multiple times with different arguments. Arguments will be passed to the test class.
 * @param timeout The test will automaticlaly fail if it has been running for longer than the specified timeout.
 */
export function test(name: string, testCases?: TestCase[], timeout: number = 2000) {
    return (target, key, descriptor) => {
        if (!target.tests) { target.tests = {}; }

        if (target.tests[name] !== undefined) {
            throw new Error(`A test named "${name}" is already registered. Copy pasta much?`);
        }

        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }

        const testMethod = descriptor.value;
        if (testCases) {
            const tests = generateTestsFromTestCases(testMethod, testCases, timeout);
            target.tests[name] = tests;
        }
        else {
            const test = generateTest(testMethod, timeout);
            target.tests[name] = test;
        }

        return descriptor;
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
        if (!target.ignoredTests) { target.ignoredTests = []; }
        target.ignoredTests.push(name);
    };
}

function generateTest(testMethod: Function, timeout: number) {
    return async () => {
        await new Promise(async (resolve, reject) => {
            setTimeout(() => reject('Test has timed out.'), timeout);
            try {
                await testMethod.bind(this)();
            }
            catch (err) {
                reject(err);
            }

            resolve();
        });
    };
}

function generateTestsFromTestCases(testMethod: Function, testCases: TestCase[], timeout: number) {
    const tests: { [name: string]: Function } = {};
    for (const testCase of testCases) {
        tests[testCase.name] = async () => {
            await new Promise(async (resolve, reject) => {
                setTimeout(() => reject('Test has timed out.'), timeout);
                try {
                    await testMethod.bind(this)(...testCase.args);
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