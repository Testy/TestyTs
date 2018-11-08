export function test(name: string, timeout: number = 2000) {
    return (target, key, descriptor) => {
        if (!target.tests) {
            target.tests = {};
        }

        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }

        const originalMethod = descriptor.value;

        const test = async function () {
            await new Promise(async (resolve, reject) => {
                setTimeout(() => reject('Test has timed out.'), timeout);
                await originalMethod.bind(this)();
                resolve();
            });
        }

        if (target.tests[name] !== undefined) {
            throw new Error(`A test named "${name}" is already registered. Copy pasta much?`);
        }

        target.tests[name] = test;

        return descriptor;
    }
};

export class TestCase {
    constructor(public name: string, public args: any[] | any, public timeout: number = 2000) { }
}

export function testCases(cases: TestCase[]) {
    return (target, key, descriptor) => {
        if (!target.tests) {
            target.tests = {};
        }

        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }

        const originalMethod = descriptor.value;

        for (const testCase of cases) {
            const test = async function () {
                await new Promise(async (resolve, reject) => {
                    setTimeout(() => reject('Test has timed out.'), testCase.timeout);

                    if (testCase.args instanceof Array) {
                        await originalMethod.bind(this)(...testCase.args);
                    }
                    else {
                        await originalMethod.bind(this)(testCase.args);
                    }

                    resolve();
                });
            }

            if (target.tests[testCase.name] !== undefined) {
                throw new Error(`A test named "${testCase.name}" is already registered. Copy pasta much?`);
            }

            target.tests[testCase.name] = test;
        }

        return descriptor;
    }
}
