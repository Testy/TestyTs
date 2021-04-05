import { Test, BeforeAll, BeforeEach, AfterEach, AfterAll } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

export class BaseTestSuite {
  public beforeAllExecuted = [];
  public beforeEachExecuted = [];
  public afterAllExecuted = [];
  public afterEachExecuted = [];

  @BeforeAll()
  private beforeAllBase() {
    this.beforeAllExecuted.push(BaseTestSuite);
  }

  @BeforeEach()
  private beforeEachBase() {
    this.beforeEachExecuted.push(BaseTestSuite);
  }

  @AfterEach()
  private afterEachBase() {
    this.afterEachExecuted.push(BaseTestSuite);
  }

  @AfterAll()
  private afterAllBase() {
    this.afterAllExecuted.push(BaseTestSuite);
  }
}

@TestSuite('Test Suite')
export class TestSuiteWithBase extends BaseTestSuite {
  @BeforeAll()
  private beforeAll() {
    this.beforeAllExecuted.push(TestSuiteWithBase);
  }

  @BeforeEach()
  private beforeEach() {
    this.beforeEachExecuted.push(TestSuiteWithBase);
  }

  @AfterEach()
  private afterEach() {
    this.afterEachExecuted.push(TestSuiteWithBase);
  }

  @AfterAll()
  private afterAll() {
    this.afterAllExecuted.push(TestSuiteWithBase);
  }

  @Test('Test')
  private test() {}
}
