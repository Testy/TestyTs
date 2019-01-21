import { Test } from '../../../testyCore';
import { TestCase } from '../../../lib/testCase';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite()
export class TestWithNoNamesTestSuite {
    @Test()
    private myTest1() { }

    @Test()
    private myTest2() { }

    @Test(undefined, [
        new TestCase('myTestCase1'),
        new TestCase('myTestCase2'),
        new TestCase('myTestCase3')
    ])
    private myTest3() { }
}