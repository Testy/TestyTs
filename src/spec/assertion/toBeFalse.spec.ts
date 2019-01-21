import { Test, TestSuite, expect } from '../../testyCore';
import { TestCase } from '../../lib/testCase';

@TestSuite('Expect ToBeFalse Test Suite')
export class ExpectToBeFalseTestSuite {

    @Test('false to be false, should succeed')
    private falseToBeFalse() {
        expect.toBeFalse(false);
    }

    @Test('false not to be false, should fail')
    private falseNotToBeFalseFail() {
        expect.toThrow(() => {
            expect.not.toBeFalse(false);
        });
    }

    @Test('To be false, should fail', [
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

    @Test('Not to be false, should succeed', [
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