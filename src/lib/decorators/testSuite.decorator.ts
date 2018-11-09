import { TestRunner } from '../testRunner';

export function testSuite(name: string) {
    return (constructor: Function) => {
        const testSuite = Object.create(constructor.prototype);
        testSuite.run = run;
        testSuite.name = name;

        TestRunner.testRunner.addTestSuite(testSuite);
    }
}

async function run(): Promise<void> {
    if (!this.tests) {
        throw new Error(`No tests found for ${this.name}. Did you forget to add the @test decorator?`);
    }

    for (const testName in this.tests) {
        const test = this.tests[testName];

        hasTestcases(test)
            ? await runTestcases(testName, test)
            : await runTest(testName, test);
    }
}

async function runTest(name: string, test: Function, isTestCase: boolean = false) {
    const indentation = isTestCase ? '    ' : '  ';
    try {
        await test.bind(this)();
        console.log(`${indentation}√ ${name}`);
    }
    catch (err) {
        console.log(`${indentation}x ${name}`);
    }
}

async function runTestcases(name: string, testCases: { [name: string]: Function }) {
    console.log('  ' + name)
    for (const testCaseName in testCases) {
        const testCase = testCases[testCaseName];
        await runTest(testCaseName, testCase, true);
    }
}

function hasTestcases(test: Function | { [name: string]: Function }) {
    return !(test instanceof Function);
}