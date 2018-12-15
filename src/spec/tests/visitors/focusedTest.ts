import { test, ftest } from '../../../testyCore';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';

@testSuite('Focused Test Test Suite')
export class FocusedTestTestSuite {

    public numberOfRunsTest1: number = 0;
    public numberOfRunsTest2: number = 0;

    @ftest('My first test')
    private test1() {
        ++this.numberOfRunsTest1;
    }

    @test('My second test')
    private test2() {
        ++this.numberOfRunsTest2;
    }
}