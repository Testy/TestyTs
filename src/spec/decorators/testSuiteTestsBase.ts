import { TestsRunnerVisitor } from '../../lib/tests/visitors/runnerVisitor';
import { Logger } from '../../lib/logger/logger';
import { NullLogger } from '../utils/nullLogger';
import { beforeEach } from '../../lib/decorators/beforeEach.decorator';
import { TestsVisitor } from '../../lib/tests/visitors/testVisitor';
import { Report } from '../../lib/reporting/report/report';
import { TestSuite } from '../../lib/tests/testSuite';

export class TestSuiteTestsBase {
    private logger: Logger = new NullLogger();
    protected visitor: TestsVisitor<Report>;

    @beforeEach()
    private beforeEach() {
        this.visitor = new TestsRunnerVisitor(this.logger);
    }

    protected getTestSuiteInstance(testClass: any): TestSuite {
        return testClass.__testSuiteInstance;
    }
}