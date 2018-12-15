import { test, TestCase, testSuite } from '../../../testyCore';

@testSuite('TestCases Test Decorator Test Suite')
export class TestCasesTestDecoratorTestSuite {

    public numberOfRunsTest1: number = 0;
    public numberOfRunsTest2: number = 0;
    public numberOfRunsTest3: number = 0;

    @test('My test with test cases', [
        new TestCase('My first test', 1),
        new TestCase('My second test', 2),
        new TestCase('My third test', 3),
    ])
    private tests(n: number) {
        if (n === 1)++this.numberOfRunsTest1;
        if (n === 2)++this.numberOfRunsTest2;
        if (n === 3)++this.numberOfRunsTest3;
    }
}