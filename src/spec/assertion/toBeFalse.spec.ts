import { testSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { expect } from '../../lib/assertion/expect';

@testSuite('Expect ToBeFalse Test Suite')
class ExpectFalseTestSuite {
    @test('false to be false')
    private expectFalseToBeFalse() {
        expect.toBeFalse(false);
    }

    @test('true to be false to fail')
    private trueToBeFalseFails() {
        expect.toThrow(() => {
            expect.toBeFalse(true);
        });
    }

    @test('undefined to be false to fail')
    private undefinedToBeFalseFails() {
        expect.toThrow(() => {
            expect.toBeFalse(undefined);
        });
    }

    @test('true not to be false')
    private trueNotToBeFalse() {
        expect.not.toBeFalse(true);
    }

    @test('false not to be false to fail')
    private falseNotToBeFalse() {
        expect.toThrow(() => {
            expect.not.toBeFalse(false);
        });
    }

    @test('undefined not to be false')
    private undefinedNotToBeFalse() {
        expect.not.toBeFalse(undefined);
    }
}