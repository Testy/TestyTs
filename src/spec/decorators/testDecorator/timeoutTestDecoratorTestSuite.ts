import { test } from '../../../lib/decorators/test.decorator';

export class TimeoutTestDecoratorTestSuite {
    @test('My test with test cases', undefined, 10)
    private async tests(n: number) {
        await new Promise(resolve => setTimeout(() => resolve(), 1000));
    }
}