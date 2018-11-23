import { test, beforeAll, beforeEach, afterEach, afterAll, TestCase } from '../../../testyCore';
import { xtest } from '../../../lib/decorators/test.decorator';

export class NormalBeforeAfterTestSuite {
    public numberOfBeforeAllExecutions = 0;
    public numberOfBeforeEachExecutions = 0;
    public numberOfAfterEachExecutions = 0;
    public numberOfAfterAllExecutions = 0;

    @beforeAll()
    private beforeAll() { ++this.numberOfBeforeAllExecutions; }

    @beforeEach()
    private beforeEach() { ++this.numberOfBeforeEachExecutions; }

    @afterEach()
    private afterEach() { ++this.numberOfAfterEachExecutions; }

    @afterAll()
    private afterAll() { ++this.numberOfAfterAllExecutions; }

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

    @xtest('d')
    private d() { }
}