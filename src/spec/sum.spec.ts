import { testSuite } from '../lib/decorators/testSuite.decorator';
import { test } from '../lib/decorators/test.decorator';
import { TestCase } from '../lib/testCase';

@testSuite('My Superb Test Suite')
class TestSuiteLel {
    @test('My First Test')
    private async lolTest() {
        // Do some assertions or whatever
    }

    @test('Sum Tests',
        [
            new TestCase('1 plus 1 equals 2', 1, 1, 2),
            new TestCase('3 minus 4 equals -1', 3, 4, -1)
        ])
    private async sumTest(a, b, c) {
    }
}