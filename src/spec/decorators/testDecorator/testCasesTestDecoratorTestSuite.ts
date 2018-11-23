import { test, TestCase } from '../../../testyCore';

export class TestCasesTestDecoratorTestSuite {

    public numberOfRunsTest1: number = 0;
    public numberOfRunsTest2: number = 0;
    public numberOfRunsTest3: number = 0;

    @test('My test with test cases', [
        new TestCase('test 1', 1),
        new TestCase('test 2', 2),
        new TestCase('test 3', 3),
    ])
    private tests(n: number) {
        if (n === 1)++this.numberOfRunsTest1;
        if (n === 2)++this.numberOfRunsTest2;
        if (n === 3)++this.numberOfRunsTest3;
    }
}