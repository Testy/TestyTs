import { test } from '../../../testyCore';

export class MultipleTestTestDecoratorTestSuite {

    public numberOfRunsTest1: number = 0;
    public numberOfRunsTest2: number = 0;
    public numberOfRunsTest3: number = 0;

    @test('My test 1.')
    private test1() {
        ++this.numberOfRunsTest1;
    }

    @test('My test 2.')
    private test2() {
        ++this.numberOfRunsTest2;
    }

    @test('My test 3.')
    private test3() {
        ++this.numberOfRunsTest3;
    }
}