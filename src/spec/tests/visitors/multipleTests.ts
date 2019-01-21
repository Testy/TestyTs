import { Test } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite('Multiple Test Test Suite')
export class MultipleTestsTestSuite {

    public numberOfRunsTest1: number = 0;
    public numberOfRunsTest2: number = 0;
    public numberOfRunsTest3: number = 0;

    @Test('My first test')
    private test1() {
        ++this.numberOfRunsTest1;
    }

    @Test('My second test')
    private test2() {
        ++this.numberOfRunsTest2;
    }

    @Test('My third test')
    private test3() {
        ++this.numberOfRunsTest3;
    }
}