import { test, beforeAll, beforeEach, afterEach, afterAll } from '../../../testyCore';
import { testSuite } from '../../../lib/decorators/testSuite.decorator';

export class BaseTestSuite {
    public beforeAllExecuted = [];
    public beforeEachExecuted = [];
    public afterAllExecuted = [];
    public afterEachExecuted = [];

    @beforeAll()
    private beforeAllBase() {
        this.beforeAllExecuted.push(BaseTestSuite);
    }

    @beforeEach()
    private beforeEachBase() {
        this.beforeEachExecuted.push(BaseTestSuite);
    }

    @afterEach()
    private afterEachBase() {
        this.afterEachExecuted.push(BaseTestSuite);
    }

    @afterAll()
    private afterAllBase() {
        this.afterAllExecuted.push(BaseTestSuite);
    }
}

@testSuite('Test Suite')
export class TestSuiteWithBase extends BaseTestSuite {
    @beforeAll()
    private beforeAll() {
        this.beforeAllExecuted.push(TestSuiteWithBase);
    }

    @beforeEach()
    private beforeEach() {
        this.beforeEachExecuted.push(TestSuiteWithBase);
    }

    @afterEach()
    private afterEach() {
        this.afterEachExecuted.push(TestSuiteWithBase);
    }

    @afterAll()
    private afterAll() {
        this.afterAllExecuted.push(TestSuiteWithBase);
    }

    @test('Test')
    private test() { }
}