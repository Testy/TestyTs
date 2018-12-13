import { test } from '../../../testyCore';
import { TestCase } from '../../../lib/testCase';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';

@testSuite()
export class TestWithNoNamesTestSuite {
    @test()
    private myTest1() { }

    @test()
    private myTest2() { }

    @test(undefined, [
        new TestCase('testCase1'),
        new TestCase('testCase2'),
        new TestCase('testCase3')
    ])
    private myTest3() { }
}