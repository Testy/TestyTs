import { Test, XTest, BeforeAll, TestCase } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite('Throws During Before All Test Suite')
export class ThrowsDuringBeforeAllTestSuite {
    @BeforeAll()
    private beforeAll() {
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