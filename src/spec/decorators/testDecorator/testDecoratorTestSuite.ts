import { test } from '../../../testyCore';

export class SingleTestTestDecoratorTestSuite {

    public numberOfRunsTest1: number = 0;

    @test('Test 1.')
    private test1() {
        ++this.numberOfRunsTest1;
    }
}