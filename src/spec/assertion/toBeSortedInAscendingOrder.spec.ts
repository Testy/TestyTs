import { Test, TestSuite, expect } from '../../testyCore';

@TestSuite('Expect ToBeSorted InAscendingOrder Tests')
export class ExpectToBeOrdered {

    @Test('ordered numbers to be ordered')
    private orderedNumbersToBeOrdered() {
        expect.toBeSorted.inAscendingOrder([-1, 2, 2, 5, 7, 100]);
    }

    @Test('unordered numbers to be ordered to fail')
    private unorderedNumbersToBeOrderedFails() {
        expect.toThrow(() => {
            expect.toBeSorted.inAscendingOrder([100, 5, 2, -1, -10]);
        });
    }

    @Test('ordered objects array to be ordered')
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

    @Test('unordered objects array to be ordered, fails')
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

    @Test('ordered numbers not to be ordered to fail')
    private orderedNumbersNotToBeOrderedFails() {
        expect.toThrow(() => {
            expect.not.toBeSorted.inAscendingOrder([-1, 2, 2, 5, 7, 100]);
        });
    }

    @Test('unordered numbers not to be ordered')
    private unorderedNumbersNotToBeOrderedFails() {
        expect.not.toBeSorted.inAscendingOrder([100, 5, 2, -1, -10]);
    }

    @Test('ordered objects array not to be ordered')
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

    @Test('unordered objects array not to be ordered')
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