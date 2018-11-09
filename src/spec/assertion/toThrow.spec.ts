import { testSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { expect } from '../../lib/assertion/expect';

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
}