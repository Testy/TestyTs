import { testSuite, ftestSuite } from '../../lib/decorators/testSuite.decorator';
import { test, ftest } from '../../lib/decorators/test.decorator';
import { TestSuite } from '../../lib/tests/testSuite';
import { Test } from '../../lib/tests/test';
import { TestStatus } from '../../lib/testStatus';
import { expect } from '../../lib/assertion/expect';
import { TestCase } from '../../lib/testCase';

@testSuite('Tests Suite Tests')
export class TestSuiteTests {
    @test('get tests, all normal tests')
    getTestsAllNormalTests() {
        // Arrange
        const testcases = new TestSuite();
        testcases.context = { key: 'somedummycontext' };
        testcases.status = TestStatus.Normal;
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Normal));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const testsuite = new TestSuite();
        testsuite.status = TestStatus.Normal;
        testsuite.set('a', testcases);
        testsuite.set('b', new Test('b', undefined, TestStatus.Normal));
        testsuite.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = testsuite.get('a') as TestSuite;
        expect.toBeDefined(actualTestcases.context);
        expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Normal);
        expect.toBeEqual((testsuite.get('b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((testsuite.get('c') as Test).status, TestStatus.Normal);
    }

    @test('get tests, has top level focused test')
    getTestsTopLevelFocusedTest() {
        // Arrange
        const testcases = new TestSuite();
        testcases.context = { key: 'somedummycontext' };
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Normal));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const testsuite = new TestSuite();
        testsuite.set('a', testcases);
        testsuite.set('b', new Test('b', undefined, TestStatus.Focused));
        testsuite.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = testsuite.get('a') as TestSuite;
        expect.toBeDefined(actualTestcases.context);
        expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((testsuite.get('b') as Test).status, TestStatus.Focused);
        expect.toBeEqual((testsuite.get('c') as Test).status, TestStatus.Ignored);
    }

    @test('get tests, has nested focused tests')
    getTestsNestedFocusedTests() {
        // Arrange
        const testcases = new TestSuite();
        testcases.context = { key: 'somedummycontext' };
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Focused));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const testsuite = new TestSuite();
        testsuite.set('a', testcases);
        testsuite.set('b', new Test('b', undefined, TestStatus.Normal));
        testsuite.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = testsuite.get('a') as TestSuite;
        expect.toBeDefined(actualTestcases.context);
        expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Focused);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((testsuite.get('b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((testsuite.get('c') as Test).status, TestStatus.Ignored);
    }

    @test('get tests, has nested focused test suite')
    getTestsNestedFocusedTestSuite() {
        // Arrange
        const testcases = new TestSuite();
        testcases.context = { key: 'somedummycontext' };
        testcases.status = TestStatus.Focused;
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Normal));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const testsuite = new TestSuite();
        testsuite.set('a', testcases);
        testsuite.set('b', new Test('b', undefined, TestStatus.Normal));
        testsuite.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = testsuite.get('a') as TestSuite;
        expect.toBeDefined(actualTestcases.context);
        expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Normal);
        expect.toBeEqual((testsuite.get('b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((testsuite.get('c') as Test).status, TestStatus.Ignored);
    }

    @test('get tests, is a focused test suite')
    getTestsIsAFocusedTestSuite() {
        // Arrange
        const testcases = new TestSuite();
        testcases.status = TestStatus.Normal;
        testcases.context = { key: 'somedummycontext' };
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Normal));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const testsuite = new TestSuite();
        testsuite.status = TestStatus.Focused;
        testsuite.set('a', testcases);
        testsuite.set('b', new Test('b', undefined, TestStatus.Normal));
        testsuite.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = testsuite.get('a') as TestSuite;
        expect.toBeDefined(actualTestcases.context);
        expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Normal);
        expect.toBeEqual((testsuite.get('b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((testsuite.get('c') as Test).status, TestStatus.Normal);
    }

    @test('get tests, has ignored tests')
    getTestsIgnoredTests() {
        // Arrange
        const testcases = new TestSuite();
        testcases.context = { key: 'somedummycontext' };
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Ignored));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const testsuite = new TestSuite();
        testsuite.set('a', testcases);
        testsuite.set('b', new Test('b', undefined, TestStatus.Ignored));
        testsuite.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = testsuite.get('a') as TestSuite;
        expect.toBeDefined(actualTestcases.context);
        expect.toBeEqual(actualTestcases.context.key, 'somedummycontext');
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Normal);
        expect.toBeEqual((testsuite.get('b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((testsuite.get('c') as Test).status, TestStatus.Normal);
    }
}