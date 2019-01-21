import { Test, TestSuite, expect } from '../../testyCore';
import { TestCase } from '../../lib/testCase';

@TestSuite('Expect ToBeFalsy Tests')
export class ExpectToBeFalsy {

    @Test('To be falsy, should succeed', [
        new TestCase('false', false),
        new TestCase('zero', 0),
        new TestCase('empty string', ''),
        new TestCase('null', null),
        new TestCase('undefined', undefined),
        new TestCase('NaN', NaN),
    ])
    private toBeFalsySuccess(arg) {
        expect.toBeFalsy(arg);
    }

    @Test('To be falsy, should fail', [
        new TestCase('true', true),
        new TestCase(`'0'`, '0'),
        new TestCase('Object', { a: 1 })
    ])
    private toBeFalsyFail(arg) {
        expect.toThrow(() => {
            expect.toBeFalsy(arg);
        });
    }

    @Test('Not to be falsy, should succeed', [
        new TestCase('true', true),
        new TestCase(`'0'`, '0'),
        new TestCase('Object', { a: 1 }),
    ])
    private notToBeFalsySuccess(arg) {
        expect.not.toBeFalsy(arg);
    }

    @Test('Not to be falsy, should fail', [
        new TestCase('false', false),
        new TestCase('zero', 0),
        new TestCase('empty string', ''),
        new TestCase('null', null),
        new TestCase('undefined', undefined),
        new TestCase('NaN', NaN),
    ])
    private notToBeFalsyFail(arg) {
        expect.toThrow(() => {
            expect.not.toBeFalsy(arg);
        });
    }
}