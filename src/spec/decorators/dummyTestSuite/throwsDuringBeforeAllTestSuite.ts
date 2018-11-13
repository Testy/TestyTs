import { test, beforeAll, TestCase } from '../../../testy';
import { xtest } from '../../../lib/decorators/test.decorator';

export class ThrowsDuringBeforeAllTestSuite {
    @beforeAll()
    private beforeAll() {
        throw new Error('This should be handled.');
    }

    @test('a')
    private a() { }

    @test('b')
    private b() { }

    @test('c', [
        new TestCase('c.1'),
        new TestCase('c.2'),
        new TestCase('c.3'),
    ])
    private c() { }

    @xtest('d')
    private d() { }
}