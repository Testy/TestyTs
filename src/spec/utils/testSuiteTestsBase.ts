import { BeforeEach } from '../../lib/decorators/afterAndBefore.decorator';
import { Report } from '../../lib/reporting/report/report';
import { TestRunnerVisitor } from '../../lib/tests/visitors/testRunnerVisitor';
import { TestVisitor } from '../../lib/tests/visitors/testVisitor';

export class TestSuiteTestsBase {
    protected visitor: TestVisitor<Report>;

    @BeforeEach()
    private beforeEach() {
        this.visitor = new TestRunnerVisitor();
    }
}