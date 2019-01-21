import { Test, TestSuite, expect } from '../../testyCore';

@TestSuite('Expect ToThrow Test Suite')
export class ExpectToThrowTestSuite {

    @Test('error to throw')
    private errorToThrow() {
        expect.toThrow(() => {
            throw new Error('I threw.');
        });
    }

    @Test('no error to throw to fail')
    private noErrorToThrowToFail() {
        expect.toThrow(() => {
            expect.toThrow(() => { });
        });
    }

    @Test('error not to throw to fail')
    private errorNotToThrowToFail() {
        expect.toThrow(() => {
            expect.not.toThrow(() => {
                throw new Error('I threw.');
            });
        });
    }

    @Test('no error not to throw')
    private noErrorNotToThrow() {
        expect.not.toThrow(() => { });
    }

    @Test('error to throw async')
    private async errorToThrowAsync() {
        await expect.toThrowAsync(async () => {
            throw new Error('I threw.');
        });
    }

    @Test('no error to throw to fail async')
    private async noErrorToThrowToFailAsync() {
        await expect.toThrowAsync(async () => {
            await expect.toThrowAsync(async () => Promise.resolve(21));
        });
    }

    @Test('error not to throw to fail async')
    private async errorNotToThrowToFailAsync() {
        await expect.toThrow(() => {
            expect.not.toThrow(() => {
                throw new Error('I threw.');
            });
        });
    }

    @Test('no error not to throw async')
    private async noErrorNotToThrowAsync() {
        await expect.not.toThrow(async () => Promise.resolve(53));
    }
}