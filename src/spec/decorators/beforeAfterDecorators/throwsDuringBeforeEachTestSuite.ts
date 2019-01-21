import { Test, XTest, BeforeEach, TestCase, TestSuite } from '../../../testyCore';

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

    @Test('c', [
        new TestCase('c.1'),
        new TestCase('c.2'),
        new TestCase('c.3'),
    ])
    private c() { }

    @XTest('d')
    private d() { }
}