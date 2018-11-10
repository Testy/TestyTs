import { TestRunner } from '../testRunner';
import { LoggerFactory } from '../logger/loggerFactory';
import { TestFlags } from '../interfaces/testSuite';

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
        testSuite.run = run;
        testSuite.name = name;
        testSuite.flag = flag;

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

async function runTest(name: string, test: Function) {
    logger.increaseIndentation();

    try {
        await test.bind(this)();
        logger.success(`√ ${name}`);
    }
    catch (err) {
        logger.failure(`x ${name} - ${err.message}`);
    }

    logger.decreaseIndentation();
}

async function runTestcases(name: string, testCases: { [name: string]: Function }) {
    logger.increaseIndentation();
    logger.info(name)
    for (const testCaseName in testCases) {
        const testCase = testCases[testCaseName];
        await runTest(testCaseName, testCase);
    }
    logger.decreaseIndentation();
}

function hasTestcases(test: Function | { [name: string]: Function }) {
    return !(test instanceof Function);
}