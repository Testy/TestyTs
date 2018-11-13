import { ftestSuite, createTestSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { beforeAll } from '../../lib/decorators/beforeAll.decorator';
import { TestStatus } from '../../lib/testStatus';
import { beforeEach } from '../../lib/decorators/beforeEach.decorator';
import { afterEach } from '../../lib/decorators/afterEach.decorator';
import { afterAll } from '../../lib/decorators/afterAll.decorator';
import { TestCase } from '../../lib/testCase';
import { expect } from '../../testy';

@ftestSuite('Before and After Decorators Test Suite')
class BeforeAfterDecoratorsTestSuite {
    @test('Test')
    private async test() {
        // Arrange
        const testSuite = createTestSuite<DummyTestSuite>(DummyTestSuite, 'Dummy Test Suite', TestStatus.Normal);

        // Act
        await testSuite.run();

        // Assert
        expect.toBeEqual(testSuite.context.numberOfBeforeAllExecutions, 1);
        expect.toBeEqual(testSuite.context.numberOfBeforeEachExecutions, 5);
        expect.toBeEqual(testSuite.context.numberOfAfterEachExecutions, 5);
        expect.toBeEqual(testSuite.context.numberOfAfterAllExecutions, 1);
    }
}

class DummyTestSuite {
    public numberOfBeforeAllExecutions = 0;
    public numberOfBeforeEachExecutions = 0;
    public numberOfAfterEachExecutions = 0;
    public numberOfAfterAllExecutions = 0;

    @beforeAll()
    private beforeAll() {
        ++this.numberOfBeforeAllExecutions;
    }

    @beforeEach()
    private beforeEach() {
        ++this.numberOfBeforeEachExecutions;
    }

    @afterEach()
    private afterEach() {
        ++this.numberOfAfterEachExecutions;
    }

    @afterAll()
    private afterAll() {
        ++this.numberOfAfterAllExecutions;
    }

    @test('a')
    private a() { }

    @test('b')
    private b() { }

    @test('c', [
        new TestCase('c.1'),
        new TestCase('c.2'),
        new TestCase('c.3'),
    ])
    private c() { }
}