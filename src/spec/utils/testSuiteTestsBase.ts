import { BeforeEach } from '../../lib/decorators/afterAndBefore.decorator';
import { Report } from '../../lib/reporting/report/report';
import { TestRunnerVisitor } from '../../lib/tests/visitors/testRunnerVisitor';
import { TestVisitor } from '../../lib/tests/visitors/testVisitor';
import { getProcessMock } from './processMock';

export class TestSuiteTestsBase {
  protected visitor: TestVisitor<Report>;
  protected processMock: NodeJS.Process;

  @BeforeEach()
  private beforeEach() {
    this.processMock = getProcessMock();
    this.visitor = new TestRunnerVisitor(this.processMock, null);
  }
}
