import { test, xtest, beforeEach, TestCase, testSuite } from '../../../testyCore';

@testSuite('Throws During Before Each Test Suite')
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

    @xtest('d')
    private d() { }
}