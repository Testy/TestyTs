import { test, testSuite, expect } from '../../testy';

@testSuite('Expect ToBeTruthy Tests')
class ExpectToBeTruthy {
    @test('true to be truthy')
    private trueToBeTruthy() {
        expect.toBeTruthy(true);
    }

    @test('false to be truthy to fail')
    private falseToBeTruthyFails() {
        expect.toThrow(() => {
            expect.toBeTruthy(false);
        });
    }

    @test(`'0' to be truthy`)
    private stringContainingZeroToBeTruthy() {
        expect.toBeTruthy('0');
    }

    @test(`'false' to be truthy`)
    private stringContainingFalseToBeTruthy() {
        expect.toBeTruthy('false');
    }

    @test(`[] to be truthy`)
    private emptyArrayToBeTruthy() {
        expect.toBeTruthy([]);
    }

    @test(`{} to be truthy`)
    private emptyObjectToBeTruthy() {
        expect.toBeTruthy({});
    }

    @test(`function(){} to be truthy`)
    private emptyFunctionToBeTruthy() {
        expect.toBeTruthy(function () { });
    }

    @test('true not to be truthy fails')
    private trueNotToBeTruthyFails() {
        expect.toThrow(() => {
            expect.not.toBeTruthy(true);
        });
    }

    @test('false not to be truthy')
    private falseNotToBeTruthy() {
        expect.not.toBeTruthy(false);
    }

    @test(`'0' not to be truthy fails`)
    private stringContainingZeroNotToBeTruthyFails() {
        expect.toThrow(() => {
            expect.not.toBeTruthy('0');
        });
    }

    @test(`'false' not to be truthy to fail`)
    private stringContainingFalseNotToBeTruthyFails() {
        expect.toThrow(() => {
            expect.not.toBeTruthy('false');
        });
    }

    @test(`[] not to be truthy to fail`)
    private emptyArrayNotToBeTruthyFails() {
        expect.toThrow(() => {
            expect.not.toBeTruthy([]);
        });
    }

    @test(`{} not to be truthy to fail`)
    private emptyObjectNotToBeTruthyFails() {
        expect.toThrow(() => {
            expect.not.toBeTruthy({});
        });
    }

    @test(`function(){} not to be truthy to fail`)
    private emptyFunctionNotToBeTruthyFails() {
        expect.toThrow(() => {
            expect.not.toBeTruthy(function () { });
        });
    }
}