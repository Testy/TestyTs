import { XTest } from '../../../lib/decorators/test.decorator';
import { TestCase } from '../../../lib/decorators/testCase.decorator';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';
import { AfterAll, AfterEach, BeforeAll, BeforeEach, Test } from '../../../testyCore';

@TestSuite('Normal Before After Test Suite')
export class NormalBeforeAfterTestSuite {
  public numberOfBeforeAllExecutions = 0;
  public numberOfBeforeEachExecutions = 0;
  public numberOfAfterEachExecutions = 0;
  public numberOfAfterAllExecutions = 0;

  @BeforeAll()
  public beforeAll() {
    ++this.numberOfBeforeAllExecutions;
  }

  @BeforeEach()
  public beforeEach() {
    ++this.numberOfBeforeEachExecutions;
  }

  @AfterEach()
  public afterEach() {
    ++this.numberOfAfterEachExecutions;
  }

  @AfterAll()
  public afterAll() {
    ++this.numberOfAfterAllExecutions;
  }

  @Test('a')
  public a() {
    // I am not an empty method!
  }

  @Test('b')
  public b() {
    // I am not an empty method!
  }

  @Test('c')
  @TestCase('c.1')
  @TestCase('c.2')
  @TestCase('c.3')
  public c() {
    // I am not an empty method!
  }

  @XTest('d')
  public d() {
    // I am not an empty method!
  }
}
