import { test, xtest, afterEach, TestCase } from '../../../testyCore';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';

@testSuite('Throws During After Each Test Suite')
export class ThrowsDuringAfterEachTestSuite {
    @afterEach()
    private afterEach() {
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