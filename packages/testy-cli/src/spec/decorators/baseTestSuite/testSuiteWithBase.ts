import { Test, BeforeAll, BeforeEach, AfterEach, AfterAll } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

export class BaseTestSuite {
  public beforeAllExecuted = [];
  public beforeEachExecuted = [];
  public afterAllExecuted = [];
  public afterEachExecuted = [];

  @BeforeAll()
  public beforeAllBase() {
    this.beforeAllExecuted.push(BaseTestSuite);
  }

  @BeforeEach()
  public beforeEachBase() {
    this.beforeEachExecuted.push(BaseTestSuite);
  }

  @AfterEach()
  public afterEachBase() {
    this.afterEachExecuted.push(BaseTestSuite);
  }

  @AfterAll()
  public afterAllBase() {
    this.afterAllExecuted.push(BaseTestSuite);
  }
}

@TestSuite('Test Suite')
export class TestSuiteWithBase extends BaseTestSuite {
  @BeforeAll()
  public beforeAll() {
    this.beforeAllExecuted.push(TestSuiteWithBase);
  }

  @BeforeEach()
  public beforeEach() {
    this.beforeEachExecuted.push(TestSuiteWithBase);
  }

  @AfterEach()
  public afterEach() {
    this.afterEachExecuted.push(TestSuiteWithBase);
  }

  @AfterAll()
  public afterAll() {
    this.afterAllExecuted.push(TestSuiteWithBase);
  }

  @Test('Test')
  public test() {
    // I am not an empty method!
  }
}
