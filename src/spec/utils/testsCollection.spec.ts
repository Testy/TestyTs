import { testSuite, ftestSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { TestsCollection } from '../../lib/tests/testsCollection';
import { Test } from '../../lib/tests/test';
import { TestStatus } from '../../lib/testStatus';
import { expect } from '../../lib/assertion/expect';

@testSuite('Tests Collection Tests')
export class TestsCollectionTests {
    @test('get tests, all normal tests')
    getTestsAllNormalTests() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.status = TestStatus.Normal;
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Normal));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.status = TestStatus.Normal;
        collection.set('a', testcases);
        collection.set('b', new Test('b', undefined, TestStatus.Normal));
        collection.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = collection.get('a') as TestsCollection;
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Normal);
        expect.toBeEqual((collection.get('b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((collection.get('c') as Test).status, TestStatus.Normal);
    }

    @test('get tests, has top level focused test')
    getTestsTopLevelFocusedTest() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Normal));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test('b', undefined, TestStatus.Focused));
        collection.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = collection.get('a') as TestsCollection;
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((collection.get('b') as Test).status, TestStatus.Focused);
        expect.toBeEqual((collection.get('c') as Test).status, TestStatus.Ignored);
    }

    @test('get tests, has nested focused tests')
    getTestsNestedFocusedTests() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Focused));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test('b', undefined, TestStatus.Normal));
        collection.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = collection.get('a') as TestsCollection;
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Focused);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((collection.get('b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((collection.get('c') as Test).status, TestStatus.Ignored);
    }

    @test('get tests, has nested focused test collection')
    getTestsNestedFocusedTestCollection() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.status = TestStatus.Focused;
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Normal));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test('b', undefined, TestStatus.Normal));
        collection.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = collection.get('a') as TestsCollection;
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Normal);
        expect.toBeEqual((collection.get('b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((collection.get('c') as Test).status, TestStatus.Ignored);
    }

    @test('get tests, is a focused test collection')
    getTestsIsAFocusedTestCollection() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.status = TestStatus.Normal;
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Normal));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.status = TestStatus.Focused;
        collection.set('a', testcases);
        collection.set('b', new Test('b', undefined, TestStatus.Normal));
        collection.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = collection.get('a') as TestsCollection;
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Normal);
        expect.toBeEqual((collection.get('b') as Test).status, TestStatus.Normal);
        expect.toBeEqual((collection.get('c') as Test).status, TestStatus.Normal);
    }

    @test('get tests, has ignored tests')
    getTestsIgnoredTests() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.set('a.a', new Test('a.a', undefined, TestStatus.Normal));
        testcases.set('a.b', new Test('a.b', undefined, TestStatus.Ignored));
        testcases.set('a.c', new Test('a.c', undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test('b', undefined, TestStatus.Ignored));
        collection.set('c', new Test('c', undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = collection.get('a') as TestsCollection;
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Normal);
        expect.toBeEqual((collection.get('b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((collection.get('c') as Test).status, TestStatus.Normal);
    }
}