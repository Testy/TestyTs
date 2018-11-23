import { test, testSuite, expect } from '../../testyCore';
import { TestCase } from '../../lib/testCase';

@testSuite('Expect ToBeFalse Test Suite')
export class ExpectToBeFalseTestSuite {

    @test('false to be false, should succeed')
    private falseToBeFalse() {
        expect.toBeFalse(false);
    }

    @test('false not to be false, should fail')
    private falseNotToBeFalseFail() {
        expect.toThrow(() => {
            expect.not.toBeFalse(false);
        });
    }

    @test('To be false, should fail', [
        new TestCase('true', true),
        new TestCase('undefined', undefined),
        new TestCase('null', null),
        new TestCase('empty array', []),
        new TestCase('empty object', {}),
        new TestCase('NaN', NaN)
    ])
    private toBeFalseFail(arg) {
        expect.toThrow(() => {
            expect.toBeFalse(arg);
        });
    }

    @test('Not to be false, should succeed', [
        new TestCase('true', true),
        new TestCase('undefined', undefined),
        new TestCase('null', null),
        new TestCase('empty array', []),
        new TestCase('empty object', {}),
        new TestCase('NaN', NaN)
    ])
    private notToBeFalseSuccess(arg) {
        expect.not.toBeFalse(arg);
    }
}