import { test, testSuite, expect } from '../../testyCore';

@testSuite('Expect ToBeSorted InAscendingOrder Tests')
export class ExpectToBeOrdered {

    @test('ordered numbers to be ordered')
    private orderedNumbersToBeOrdered() {
        expect.toBeSorted.inAscendingOrder([-1, 2, 2, 5, 7, 100]);
    }

    @test('unordered numbers to be ordered to fail')
    private unorderedNumbersToBeOrderedFails() {
        expect.toThrow(() => {
            expect.toBeSorted.inAscendingOrder([100, 5, 2, -1, -10]);
        });
    }

    @test('ordered objects array to be ordered')
    private orderedObjectsToBeOrdered() {
        expect.toBeSorted.inAscendingOrder(
            [
                { a: -10 },
                { a: -1 },
                { a: 3 },
                { a: 100 },
            ],
            x => x.a);
    }

    @test('unordered objects array to be ordered, fails')
    private unorderedObjectsToBeOrderedFails() {
        expect.toThrow(() => {
            expect.toBeSorted.inAscendingOrder(
                [
                    { a: 14 },
                    { a: -1 },
                    { a: 3 },
                    { a: 10 },
                ],
                x => x.a);
        });
    }

    @test('ordered numbers not to be ordered to fail')
    private orderedNumbersNotToBeOrderedFails() {
        expect.toThrow(() => {
            expect.not.toBeSorted.inAscendingOrder([-1, 2, 2, 5, 7, 100]);
        });
    }

    @test('unordered numbers not to be ordered')
    private unorderedNumbersNotToBeOrderedFails() {
        expect.not.toBeSorted.inAscendingOrder([100, 5, 2, -1, -10]);
    }

    @test('ordered objects array not to be ordered')
    private orderedObjectsNotToBeOrdered() {
        expect.toThrow(() => {
            expect.not.toBeSorted.inAscendingOrder(
                [
                    { a: -10 },
                    { a: -1 },
                    { a: 3 },
                    { a: 100 }
                ],
                x => x.a);
        });
    }

    @test('unordered objects array not to be ordered')
    private unorderedObjectsNotToBeOrdered() {
        expect.not.toBeSorted.inAscendingOrder(
            [
                { a: 14 },
                { a: -1 },
                { a: 3 },
                { a: 10 }
            ],
            x => x.a);
    }
}