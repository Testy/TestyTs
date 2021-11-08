import { BeforeEach } from '../../../lib/decorators/afterAndBefore.decorator';
import { Test, TestSuite } from '../../../testyCore';

class Base {
  @BeforeEach() beforeEach() {
    // I am not an empty method!
  }
}

@TestSuite()
export class TestSuiteA extends Base {
  @Test() testA() {
    // I am not an empty method!
  }
}

@TestSuite()
export class TestSuiteB extends Base {
  @Test() testB() {
    // I am not an empty method!
  }
}
