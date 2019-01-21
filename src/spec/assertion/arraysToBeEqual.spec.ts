import { Test, TestSuite, expect, TestCase } from '../../testyCore';

@TestSuite('Expect ArraysToBeEqual Test Suite')
export class ExpectArraysToBeEqualTestSuite {

    @Test('Arrays to be equal', [
        new TestCase(`'a, b, c' and 'a, b, c'`, ['a', 'b', 'c'], ['a', 'b', 'c']),
        new TestCase(`empty arrays`, [], []),
        new TestCase(`arrays with undefined values`, [undefined, undefined], [undefined, undefined]),
    ])
    private equal(actual, expected) {
        expect.arraysToBeEqual(actual, expected);
    }

    @Test('Arrays to be equal, should fail', [
        new TestCase(`'a, b, c' to equal 'b, c, a'`, ['a', 'b', 'c'], ['b', 'c', 'a']),
        new TestCase(`different lengths`, ['a', 'b', 'c', 'd'], ['a', 'b', 'c']),
        new TestCase(`different lengths, but the other way around`, ['a', 'b', 'c'], ['a', 'b', 'c', 'd']),
    ])
    private unequal(actual, expected) {
        expect.toThrow(() => {
            expect.arraysToBeEqual(actual, expected);
        });
    }
}