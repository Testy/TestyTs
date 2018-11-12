import { TestCase } from '../testCase';

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

function generateTest(testMethod: Function, timeout: number) {
    return async function () {
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