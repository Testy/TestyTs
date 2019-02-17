import { Test, XTest, AfterAll, TestCaseInstance } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';
import { TestCase } from '../../../lib/decorators/testCase.decorator';

@TestSuite('Throws During After All Test Suite ')
export class ThrowsDuringAfterAllTestSuite {
    @AfterAll()
    private afterAll() {
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