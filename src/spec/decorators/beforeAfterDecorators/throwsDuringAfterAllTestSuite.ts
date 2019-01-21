import { Test, XTest, AfterAll, TestCase } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

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

    @Test('c', [
        new TestCase('c.1'),
        new TestCase('c.2'),
        new TestCase('c.3'),
    ])
    private c() { }

    @XTest('d')
    private d() { }
}