import { Test } from '../../../testyCore';
import { TestCase } from '../../../lib/testCase';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite()
export class AsyncTests {
    @Test()
    private async myTest1() { }

    @Test(undefined, undefined, 0)
    private async myTest2() {
        await new Promise(res => {});
    }

    @Test(undefined, [
        new TestCase('myTestCase1'),
        new TestCase('myTestCase2'),
        new TestCase('myTestCase3')
    ])
    private async myTest3() {
        await new Promise(res => res());
    }
}