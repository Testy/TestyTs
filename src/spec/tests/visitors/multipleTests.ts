import { test } from '../../../testyCore';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';

@testSuite('Multiple Test Test Suite')
export class MultipleTestTestDecoratorTestSuite {

    public numberOfRunsTest1: number = 0;
    public numberOfRunsTest2: number = 0;
    public numberOfRunsTest3: number = 0;

    @test('My first test')
    private test1() {
        ++this.numberOfRunsTest1;
    }

    @test('My second test')
    private test2() {
        ++this.numberOfRunsTest2;
    }

    @test('My third test')
    private test3() {
        ++this.numberOfRunsTest3;
    }
}