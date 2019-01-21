import { Report } from '../../lib/reporting/report/report';
import { TestSuiteInstance } from '../../lib/tests/testSuite';
import { TestVisitor } from '../../lib/tests/visitors/testVisitor';
import { TestRunnerVisitor } from '../../lib/tests/visitors/testRunnerVisitor';
import { BeforeEach } from '../../lib/decorators/afterAndBefore.decorator';

export class TestSuiteTestsBase {
    protected visitor: TestVisitor<Report>;

    @BeforeEach()
    private beforeEach() {
        this.visitor = new TestRunnerVisitor();
    }

    protected getTestSuiteInstance(testClass: any): TestSuiteInstance {
        return testClass.__testSuiteInstance;
    }
}