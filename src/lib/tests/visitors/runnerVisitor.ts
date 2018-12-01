import { TestsCollection } from '../testsCollection';
import { Test } from '../test';
import { TestVisitor } from './testVisitor';
import { Logger } from '../../logger/logger';
import { SuccessfulTestReport } from '../../reporting/report/successfulTestReport';
import { FailedTestReport } from '../../reporting/report/failedTestReport';
import { TestStatus } from '../../testStatus';
import { SkippedTestReport } from '../../reporting/report/skippedTestReport';

export class RunnerVisitor implements TestVisitor {
    private contexts: any[] = [];

    constructor(private logger: Logger) { }

    public async visitTestCollection(tests: TestsCollection) {
        if (tests.context) { this.contexts.push(tests.context); }

        this.logger.info(tests.name);
        this.logger.increaseIndentation();

        await this.runAll(tests.beforeAllMethods, tests.context);

        for (const id of tests.testIds) {
            await this.runAll(tests.beforeEachMethods, tests.context);
            await tests.get(id).accept(this);
            await this.runAll(tests.afterEachMethods, tests.context);
        }

        await this.runAll(tests.afterAllMethods, tests.context);

        this.logger.decreaseIndentation();
        if (tests.context) { this.contexts.pop(); }
    }

    public async visitTest(test: Test) {
        if (test.status === TestStatus.Ignored) {
            const a = new SkippedTestReport(test.name, this.logger);
            return;
        }

        try {
            const context = this.contexts.length > 0 ? this.contexts[this.contexts.length - 1] : undefined;
            await test.run(context);
            const a = new SuccessfulTestReport(test.name, 0, this.logger);
        }
        catch (err) {
            const a = new FailedTestReport(test.name, err.message, 0, this.logger);
        }
    }

    private async runAll(methods, context: any) {
        for (const method of methods) {
            await method.bind(context)();
        }
    }
}