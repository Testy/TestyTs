import { TestRunner } from './testRunner';

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
        try {
            await test.bind(this)();
            console.log(`  √ ${testName}`);
        }
        catch (err) {
            console.log(`  x ${testName}`);
        }
    }
}