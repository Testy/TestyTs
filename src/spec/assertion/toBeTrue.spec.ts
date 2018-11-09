import { test, testSuite, expect } from '../../testy';

@testSuite('Expect ToBeTrue Tests')
class ExpectToBeTrue {
    @test('true to be true')
    private trueToBeTrue() {
        expect.toBeTrue(true);
    }

    @test('false to be true to fail')
    private falseToBeTrueFails() {
        expect.toThrow(() => {
            expect.toBeTrue(false);
        });
    }

    @test('undefined to be true to fail')
    private undefinedToBeTrueFails() {
        expect.toThrow(() => {
            expect.toBeTrue(undefined);
        });
    }

    @test('null to be true to fail')
    private nullToBeTrueFails() {
        expect.toThrow(() => {
            expect.toBeTrue(null);
        });
    }

    @test('false not to be true')
    private falseNotToBeTrue() {
        expect.not.toBeTrue(false);
    }

    @test('true not to be true to fail')
    private trueNotToBeTrue() {
        expect.toThrow(() => {
            expect.not.toBeTrue(true);
        });
    }

    @test('undefined not to be true')
    private undefinedNotToBeTrue() {
        expect.not.toBeTrue(undefined);
    }

    @test('null not to be true')
    private nullNotToBeTrue() {
        expect.not.toBeTrue(null);
    }
}