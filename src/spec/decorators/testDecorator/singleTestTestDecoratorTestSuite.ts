import { test } from '../../../testyCore';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';

@testSuite('Single Test Test Decorator Test Suite')
export class SingleTestTestDecoratorTestSuite {

    public numberOfRunsTest1: number = 0;

    @test('Test 1.')
    private test1() {
        ++this.numberOfRunsTest1;
    }
}