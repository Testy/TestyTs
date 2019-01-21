import { Test, XTest, AfterEach, TestCase } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite('Throws During After Each Test Suite')
export class ThrowsDuringAfterEachTestSuite {
    @AfterEach()
    private afterEach() {
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