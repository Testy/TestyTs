import { test, testSuite, expect } from '../../testyCore';

@testSuite('Expect ToBeSorted InDescendingOrder Tests')
export class ExpectToBeOrdered {

    @test('ordered numbers to be ordered')
    private orderedNumbersToBeOrdered() {
        expect.toBeSorted.inDescendingOrder([100, 5, 2, 2, -1, -10]);
    }

    @test('unordered numbers to be ordered to fail')
    private unoderedNumbersToBeOrderedFails() {
        expect.toThrow(() => {
            expect.toBeSorted.inDescendingOrder([-1, 2, 5, 7, 100]);
        });
    }

    @test('unordered numbers array to fail')
    private unorderedNumbersToBeOrdered() {
        expect.toThrow(() => {
            expect.toBeSorted.inDescendingOrder([3, 2, -1, 4, 5]);
        });
    }

    @test('ordered objects array to be ordered')
    private orderedObjectsToBeOrdered() {
        expect.toBeSorted.inDescendingOrder(
            [
                { a: 100 },
                { a: 3 },
                { a: -1 },
                { a: -10 },
            ],
            x => x.a);
    }

    @test('unordered objects array to fail')
    private unorderedObjectsToBeOrderedFails() {
        expect.toThrow(() => {
            expect.toBeSorted.inDescendingOrder(
                [
                    { a: 14 },
                    { a: -1 },
                    { a: 3 },
                    { a: 10 },
                ],
                x => x.a);
        });
    }

    @test('ordered numbers not to be ordered, fails')
    private orderedNumbersNotToBeOrderedFails() {
        expect.toThrow(() => {
            expect.not.toBeSorted.inDescendingOrder([100, 5, 2, 2, -1, -10]);
        });
    }

    @test('unordered numbers not to be ordered')
    private unoderedNumberNotsToBeOrdered() {
        expect.not.toBeSorted.inDescendingOrder([-1, 2, -29, 7, 100]);
    }

    @test('ordered objects array not to be ordered, fails')
    private orderedObjectsNotToBeOrderedFails() {
        expect.toThrow(() => {
            expect.not.toBeSorted.inDescendingOrder(
                [
                    { a: 100 },
                    { a: 3 },
                    { a: -1 },
                    { a: -10 },
                ],
                x => x.a);
        });
    }

    @test('unordered objects array to be ordered')
    private unorderedObjectsNotToBeOrdered() {
        expect.not.toBeSorted.inDescendingOrder(
            [
                { a: 14 },
                { a: -1 },
                { a: 3 },
                { a: 10 },
            ],
            x => x.a);
    }
}