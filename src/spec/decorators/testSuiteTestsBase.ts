import { Report } from '../../lib/reporting/report/report';
import { TestSuite } from '../../lib/tests/testSuite';
import { TestVisitor } from '../../lib/tests/visitors/testVisitor';
import { TestRunnerVisitor } from '../../lib/tests/visitors/testRunnerVisitor';
import { beforeEach } from '../../lib/decorators/afterAndBefore.decorator';

export class TestSuiteTestsBase {
    protected visitor: TestVisitor<Report>;

    @beforeEach()
    private beforeEach() {
        this.visitor = new TestRunnerVisitor();
    }

    protected getTestSuiteInstance(testClass: any): TestSuite {
        return testClass.__testSuiteInstance;
    }
}