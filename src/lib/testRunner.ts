import { TestSuite, TestFlags } from './interfaces/testSuite';
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
        for (const testSuite of this.getActiveTests()) {
            this.logger.info(`Running ${testSuite.name}`);
            await testSuite.run();

        }

        this.logger.warn('\nSome tests were ignored.');
        this.logger.increaseIndentation();
        for (const testSuite of this.getIgnoredTests()) {
            this.logger.info(`Ignoring ${testSuite.name}`);
        }
        this.logger.decreaseIndentation();
    }

    private getActiveTests() {
        return this.testSuites.filter(x => this.hasFocusedTests() && x.flag === TestFlags.Focused || !this.hasFocusedTests() && x.flag !== TestFlags.Ignored);
    }

    private getIgnoredTests() {
        return this.testSuites.filter(x => this.hasFocusedTests() && x.flag !== TestFlags.Focused || x.flag === TestFlags.Ignored);
    }

    private hasFocusedTests() {
        return this.testSuites.find(x => x.flag === TestFlags.Focused) !== undefined;
    }

    private hasIgnoredTests() {
        return this.testSuites.find(x => x.flag === TestFlags.Ignored) !== undefined;
    }
}

TestRunner.initialize();
