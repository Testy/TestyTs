import { Test, XTest, BeforeEach, TestCaseInstance, TestSuite } from '../../../testyCore';
import { TestCase } from '../../../lib/decorators/testCase.decorator';

@TestSuite('Throws During Before Each Test Suite')
export class ThrowsDuringBeforeEachTestSuite {
    @BeforeEach()
    private beforeEach() {
        throw new Error('This should be handled.');
    }

    @Test('a')
    private a() { }

    @Test('b')
    private b() { }

    @Test('c')
    @TestCase('c.1')
    @TestCase('c.2')
    @TestCase('c.3')
    private c() { }

    @XTest('d')
    private d() { }
}