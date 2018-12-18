import { test, testSuite, expect, TestCase } from '../../testyCore';

@testSuite('Expect ToBeTrue Tests')
export class ExpectToBeTrue {

    @test('true to be true')
    private trueToBeTrue() {
        expect.toBeTrue(true);
    }

    @test('true not to be true to fail')
    private trueNotToBeTrue() {
        expect.toThrow(() => {
            expect.not.toBeTrue(true);
        });
    }

    @test('To be true, should fail', [
        new TestCase('false', false),
        new TestCase('undefined', undefined),
        new TestCase('null', null),
    ])
    private toBeTrueFail(arg) {
        expect.toThrow(() => {
            expect.toBeTrue(arg);
        });
    }

    @test('Not to be true, should succeed', [
        new TestCase('false', false),
        new TestCase('undefined', undefined),
        new TestCase('null', null),
    ])
    private notToBeTrueSuccess(arg) {
        expect.not.toBeTrue(arg);
    }
}