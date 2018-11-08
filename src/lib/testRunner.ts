import { TestSuite } from './testSuite';

export class TestRunner {
    private static _testRunner: TestRunner;
    public static get testRunner(): TestRunner { return TestRunner._testRunner; }
    private testSuites: TestSuite[] = [];

    static initialize() {
        TestRunner._testRunner = new TestRunner();
    }

    public addTestSuite(testSuite: TestSuite) {
        this.testSuites.push(testSuite);
    }

    public async runTests() {
        for (const testSuite of this.testSuites) {
            console.log(`Running ${testSuite.name}`);
            await testSuite.run();
        }
    }
}

TestRunner.initialize();
