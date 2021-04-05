import { Test, BeforeAll, BeforeEach, AfterEach, AfterAll, TestCaseInstance } from '../../../testyCore';
import { XTest } from '../../../lib/decorators/test.decorator';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';
import { TestCase } from '../../../lib/decorators/testCase.decorator';

@TestSuite('Normal Before After Test Suite')
export class NormalBeforeAfterTestSuite {
  public numberOfBeforeAllExecutions = 0;
  public numberOfBeforeEachExecutions = 0;
  public numberOfAfterEachExecutions = 0;
  public numberOfAfterAllExecutions = 0;

  @BeforeAll()
  private beforeAll() {
    ++this.numberOfBeforeAllExecutions;
  }

  @BeforeEach()
  private beforeEach() {
    ++this.numberOfBeforeEachExecutions;
  }

  @AfterEach()
  private afterEach() {
    ++this.numberOfAfterEachExecutions;
  }

  @AfterAll()
  private afterAll() {
    ++this.numberOfAfterAllExecutions;
  }

  @Test('a')
  private a() {}

  @Test('b')
  private b() {}

  @Test('c')
  @TestCase('c.1')
  @TestCase('c.2')
  @TestCase('c.3')
  private c() {}

  @XTest('d')
  private d() {}
}
