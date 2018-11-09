import { test, testSuite, expect } from '../../testy';

@testSuite('Expect ToBeFalse Test Suite')
class ExpectToBeFalseTestSuite {
    @test('false to be false')
    private falseToBeFalse() {
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

    @test('null to be false to fail')
    private nullToBeFalseFails() {
        expect.toThrow(() => {
            expect.toBeFalse(null);
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

    @test('null not to be false')
    private nullNotToBeFalse() {
        expect.not.toBeFalse(null);
    }
}