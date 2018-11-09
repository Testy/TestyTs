import { TestSuite } from './interfaces/testSuite';
import { LoggerFactory } from './logger/loggerFactory';
import { Logger } from './logger/logger';

export class TestRunner {
    private static _testRunner: TestRunner;
    public static get testRunner(): TestRunner { return TestRunner._testRunner; }
    private testSuites: TestSuite[] = [];

    public constructor(private logger: Logger) { }

    static initialize() {
        TestRunner._testRunner = new TestRunner(LoggerFactory.create());
    }

    public addTestSuite(testSuite: TestSuite) {
        this.testSuites.push(testSuite);
    }

    public async runTests() {
        for (const testSuite of this.testSuites) {
            this.logger.info(`Running ${testSuite.name}`);
            await testSuite.run();
        }
    }
}

TestRunner.initialize();
