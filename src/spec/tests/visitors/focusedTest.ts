import { Test, FTest } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite('Focused Test Test Suite')
export class FocusedTestTestSuite {

    public numberOfRunsTest1: number = 0;
    public numberOfRunsTest2: number = 0;

    @FTest('My first test')
    private test1() {
        ++this.numberOfRunsTest1;
    }

    @Test('My second test')
    private test2() {
        ++this.numberOfRunsTest2;
    }
}