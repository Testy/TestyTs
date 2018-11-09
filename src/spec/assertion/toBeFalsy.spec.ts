import { test, testSuite, expect } from '../../testy';

@testSuite('Expect ToBeFalsy Tests')
class ExpectToBeFalsy {
    @test('false to be falsy')
    private falseToBeFalsy() {
        expect.toBeFalsy(false);
    }

    @test('true to be falsy to fail')
    private trueToBeFalsyFails() {
        expect.toThrow(() => {
            expect.toBeFalsy(true);
        });
    }

    @test('0 to be falsy')
    private zeroToBeFalsy() {
        expect.toBeFalsy(0);
    }

    @test(`'' to be falsy`)
    private emptyStringToBeFalsy() {
        expect.toBeFalsy('');
    }

    @test(`null to be falsy`)
    private nullStringToBeFalsy() {
        expect.toBeFalsy(null);
    }

    @test(`undefined to be falsy`)
    private undefinedStringToBeFalsy() {
        expect.toBeFalsy(undefined);
    }

    @test(`NaN to be falsy`)
    private naNStringToBeFalsy() {
        expect.toBeFalsy(NaN);
    }

    @test('false not to be falsy to fail')
    private falseNotToBeFalsyFails() {
        expect.toThrow(() => {
            expect.not.toBeFalsy(false);
        });
    }

    @test('true not to be falsy')
    private trueNotToBeFalsy() {
        expect.not.toBeFalsy(true);
    }

    @test('0 to be falsy to fail')
    private zeroNotToBeFalsyFails() {
        expect.toThrow(() => {
            expect.not.toBeFalsy(0);
        });
    }

    @test(`'' to be falsy to fail`)
    private emptyStringNotToBeFalsyFails() {
        expect.toThrow(() => {
            expect.not.toBeFalsy('');
        });
    }

    @test(`null to be falsy to fail`)
    private nullStringNotToBeFalsyFails() {
        expect.toThrow(() => {
            expect.not.toBeFalsy(null);
        });
    }

    @test(`undefined to be falsy to fail`)
    private undefinedStringNotToBeFalsyFails() {
        expect.toThrow(() => {
            expect.not.toBeFalsy(undefined);
        });
    }

    @test(`NaN to be falsy to fail`)
    private naNStringNotToBeFalsyFails() {
        expect.toThrow(() => {
            expect.not.toBeFalsy(NaN);
        });
    }
}