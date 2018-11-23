import { test } from '../../../testyCore';

export class TimeoutTestDecoratorTestSuite {
    @test('My test with test cases', undefined, 10)
    private async tests(n: number) {
        await new Promise(resolve => setTimeout(() => resolve(), 1000));
    }
}