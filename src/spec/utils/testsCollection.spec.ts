import { testSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { TestsCollection } from '../../lib/utils/testsCollection';
import { Test } from '../../lib/interfaces/test';
import { TestStatus } from '../../lib/testStatus';
import { expect } from '../../lib/assertion/expect';

@testSuite('Tests Collection Tests')
export class TestsCollectionTests {
    @test('get tests, all normal tests')
    getTestsAllNormalTests() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.set('a.a', new Test(undefined, TestStatus.Normal));
        testcases.set('a.b', new Test(undefined, TestStatus.Normal));
        testcases.set('a.c', new Test(undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test(undefined, TestStatus.Normal));
        collection.set('c', new Test(undefined, TestStatus.Normal));

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
        testcases.set('a.a', new Test(undefined, TestStatus.Normal));
        testcases.set('a.b', new Test(undefined, TestStatus.Normal));
        testcases.set('a.c', new Test(undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test(undefined, TestStatus.Focused));
        collection.set('c', new Test(undefined, TestStatus.Normal));

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
        testcases.set('a.a', new Test(undefined, TestStatus.Normal));
        testcases.set('a.b', new Test(undefined, TestStatus.Focused));
        testcases.set('a.c', new Test(undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test(undefined, TestStatus.Normal));
        collection.set('c', new Test(undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = collection.get('a') as TestsCollection;
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Focused);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((collection.get('b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((collection.get('c') as Test).status, TestStatus.Ignored);
    }

    @test('get tests, has ignored tests')
    getTestsIgnoredTests() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.set('a.a', new Test(undefined, TestStatus.Normal));
        testcases.set('a.b', new Test(undefined, TestStatus.Ignored));
        testcases.set('a.c', new Test(undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test(undefined, TestStatus.Ignored));
        collection.set('c', new Test(undefined, TestStatus.Normal));

        // Act & Assert
        const actualTestcases = collection.get('a') as TestsCollection;
        expect.toBeEqual((actualTestcases.get('a.a') as Test).status, TestStatus.Normal);
        expect.toBeEqual((actualTestcases.get('a.b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((actualTestcases.get('a.c') as Test).status, TestStatus.Normal);
        expect.toBeEqual((collection.get('b') as Test).status, TestStatus.Ignored);
        expect.toBeEqual((collection.get('c') as Test).status, TestStatus.Normal);
    }
}