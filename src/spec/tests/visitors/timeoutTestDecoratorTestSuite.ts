import { test } from '../../../testyCore';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';

@testSuite('Timeout Test Decorator Test Suite')
export class TimeoutTestDecoratorTestSuite {
    @test('My test with test cases', undefined, 10)
    private async tests(n: number) {
        await new Promise(resolve => setTimeout(() => resolve(), 1000));
    }
}