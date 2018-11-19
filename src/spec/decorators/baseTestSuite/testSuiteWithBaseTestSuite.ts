import { beforeAll } from '../../../lib/decorators/beforeAll.decorator';
import { test } from '../../../lib/decorators/test.decorator';
import { beforeEach } from '../../../lib/decorators/beforeEach.decorator';
import { afterEach } from '../../../lib/decorators/afterEach.decorator';
import { afterAll } from '../../../lib/decorators/afterAll.decorator';

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