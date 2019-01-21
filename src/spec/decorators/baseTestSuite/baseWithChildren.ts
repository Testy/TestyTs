import { TestSuite, Test } from '../../../testyCore';
import { BeforeEach } from '../../../lib/decorators/afterAndBefore.decorator';

class Base {
    @BeforeEach() beforeEach() { }
}

@TestSuite()
export class TestSuiteA extends Base {
    @Test() testA() { }
}

@TestSuite()
export class TestSuiteB extends Base {
    @Test() testB() { }
}