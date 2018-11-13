import { createTestSuite, testSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { TestStatus } from '../../lib/testStatus';
import { expect } from '../../testy';
import { NormalBeforeAfterTestSuite } from './dummyTestSuite/normalBeforeAfterTestSuite';

@testSuite('Before and After Decorators Test Suite')
class BeforeAfterDecoratorsTestSuite {
    @test('Test')
    private async test() {
        // Arrange
        const testSuite = createTestSuite(NormalBeforeAfterTestSuite, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        await testSuite.run();

        // Assert
        expect.toBeEqual(testSuite.context.numberOfBeforeAllExecutions, 1);
        expect.toBeEqual(testSuite.context.numberOfBeforeEachExecutions, 5);
        expect.toBeEqual(testSuite.context.numberOfAfterEachExecutions, 5);
        expect.toBeEqual(testSuite.context.numberOfAfterAllExecutions, 1);
    }
}

