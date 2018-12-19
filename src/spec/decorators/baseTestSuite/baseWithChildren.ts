import { testSuite, test } from '../../../testyCore';
import { beforeEach } from '../../../lib/decorators/afterAndBefore.decorator';

class Base {
    @beforeEach() beforeEach() { }
}

@testSuite()
export class TestSuiteA extends Base {
    @test() testA() { }
}

@testSuite()
export class TestSuiteB extends Base {
    @test() testB() { }
}