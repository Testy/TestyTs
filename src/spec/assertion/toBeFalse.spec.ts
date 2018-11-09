import { testSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { expect } from '../../lib/assertion/expect';

@testSuite('ToBeFalse Test Suite')
class ExpectFalseTestSuite {
    @test('Expect false to be false')
    private expectFalseToBeFalse() {
        expect.toBeFalse(false);
    }

    @test('Expect true to be false, should fail')
    private expectTrueToBeFalseFails() {
        expect.toThrow(() => {
            expect.toBeFalse(true);
        });
    }

    @test('Expect undefined to be false, should fail')
    private expectUndefinedToBeFalseFails() {
        expect.toThrow(() => {
            expect.toBeFalse(undefined);
        });
    }

    @test('Expect true not to be false')
    private expectTrueNotToBeFalse() {
        expect.not.toBeFalse(true);
    }

    @test('Expect false not to be false, should fail')
    private expectFalseNotToBeFalse() {
        expect.toThrow(() => {
            expect.not.toBeFalse(false);
        });
    }

    @test('Expect undefined not to be false')
    private undefinedNotToBeFalse() {
        expect.not.toBeFalse(undefined);
    }
}