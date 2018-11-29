import { testSuite, ftestSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { TestsCollection } from '../../lib/utils/testsCollection';
import { Test } from '../../lib/interfaces/test';
import { TestStatus } from '../../lib/testStatus';
import { expect } from '../../lib/assertion/expect';

@ftestSuite('Tests Collection Tests')
export class TestsCollectionTests {
    @test('get active tests, all normal tests')
    getActiveTestsAllNormalTests() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.set('a.a', new Test(undefined, TestStatus.Normal));
        testcases.set('a.b', new Test(undefined, TestStatus.Normal));
        testcases.set('a.c', new Test(undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test(undefined, TestStatus.Normal));
        collection.set('c', new Test(undefined, TestStatus.Normal));

        // Act
        const actualTests = collection.activeTests();
        const actualTestcases = actualTests.get('a');

        // Assert
        expect.toBeEqual(actualTests.testNames.length, 3);
        expect.toBeTrue(actualTestcases instanceof TestsCollection);
        expect.toBeEqual((actualTestcases as TestsCollection).testNames.length, 3);
    }

    @test('get active tests, some focused tests')
    getActiveTestsSomeFocusedTests() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.set('a.a', new Test(undefined, TestStatus.Focused));
        testcases.set('a.b', new Test(undefined, TestStatus.Ignored));
        testcases.set('a.c', new Test(undefined, TestStatus.Focused));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test(undefined, TestStatus.Focused));
        collection.set('c', new Test(undefined, TestStatus.Normal));

        // Act
        const actualTests = collection.activeTests();
        const actualTestcases = actualTests.get('a');

        // Assert
        expect.toBeEqual(actualTests.testNames.length, 2);
        expect.toBeTrue(actualTestcases instanceof TestsCollection);
        expect.toBeEqual((actualTestcases as TestsCollection).testNames.length, 2);
    }

    @test('get active tests, some ignored tests')
    getActiveTestsSomeIgnoredTests() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.set('a.a', new Test(undefined, TestStatus.Normal));
        testcases.set('a.b', new Test(undefined, TestStatus.Ignored));
        testcases.set('a.c', new Test(undefined, TestStatus.Normal));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test(undefined, TestStatus.Ignored));
        collection.set('c', new Test(undefined, TestStatus.Normal));

        // Act
        const actualTests = collection.activeTests();
        const actualTestcases = actualTests.get('a');

        // Assert
        expect.toBeEqual(actualTests.testNames.length, 2);
        expect.toBeTrue(actualTestcases instanceof TestsCollection);
        expect.toBeEqual((actualTestcases as TestsCollection).testNames.length, 2);
    }

    @test('get skipped tests, some focused tests')
    getSkippedTetsSomeFocusedTests() {
        // Arrange
        const testcases = new TestsCollection();
        testcases.set('a.a', new Test(undefined, TestStatus.Normal));
        testcases.set('a.b', new Test(undefined, TestStatus.Ignored));
        testcases.set('a.c', new Test(undefined, TestStatus.Focused));

        const collection = new TestsCollection();
        collection.set('a', testcases);
        collection.set('b', new Test(undefined, TestStatus.Ignored));
        collection.set('c', new Test(undefined, TestStatus.Focused));

        // Act
        const skippedTests = collection.skippedTests();
        const subSkippedTests = skippedTests.get('a');

        // Assert
        expect.toBeEqual(skippedTests.testNames.length, 2);
        expect.toBeTrue(subSkippedTests instanceof TestsCollection);
        expect.toBeEqual((subSkippedTests as TestsCollection).testNames.length, 2);
    }
}