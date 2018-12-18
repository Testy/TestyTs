import { test } from '../../../testyCore';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';

@testSuite('Multiple Test Test Decorator Test Suite')
export class MultipleTestTestDecoratorTestSuite {

    @test('My first test')
    private test1() { }

    @test('My second test')
    private test2() { }

    @test('My third test')
    private test3() { }
}