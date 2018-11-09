import { test, testSuite, expect } from '../../testy';

@testSuite('Expect ToThrow Test Suite')
class ExpectToThrowTestSuite {
    
    @test('error to throw')
    private errorToThrow() {
        expect.toThrow(() => {
            throw new Error('I threw.');
        })
    }

    @test('no error to throw to fail')
    private noErrorToThrowToFail() {
        expect.toThrow(() => {
            expect.toThrow(() => { });
        });
    }

    @test('error not to throw to fail')
    private errorNotToThrowToFail() {
        expect.toThrow(() => {
            expect.not.toThrow(() => {
                throw new Error('I threw.');
            })
        })
    }

    @test('no error not to throw')
    private noErrorNotToThrow() {
        expect.not.toThrow(() => { });
    }

    @test('error to throw async')
    private async errorToThrowAsync() {
        await expect.toThrowAsync(async () => {
            throw new Error('I threw.');
        })
    }

    @test('no error to throw to fail async')
    private async noErrorToThrowToFailAsync() {
        await expect.toThrowAsync(async () => {
            await expect.toThrowAsync(async () => Promise.resolve(21));
        });
    }

    @test('error not to throw to fail async')
    private async errorNotToThrowToFailAsync() {
        await expect.toThrow(() => {
            expect.not.toThrow(() => {
                throw new Error('I threw.');
            })
        })
    }

    @test('no error not to throw async')
    private async noErrorNotToThrowAsync() {
        await expect.not.toThrow(async () => Promise.resolve(53));
    }
}