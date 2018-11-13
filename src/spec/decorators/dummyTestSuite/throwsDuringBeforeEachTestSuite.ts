import { test, beforeEach, TestCase } from '../../../testy';

export class ThrowsDuringBeforeEachTestSuite {
    @beforeEach()
    private beforeEach() {
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
}