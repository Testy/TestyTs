import { Test } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite('Timeout Test Decorator Test Suite')
export class TimeoutTestDecoratorTestSuite {
    @Test('My test with test cases', undefined, 10)
    private async tests(n: number) {
        await new Promise(resolve => setTimeout(() => resolve(), 1000));
    }
}