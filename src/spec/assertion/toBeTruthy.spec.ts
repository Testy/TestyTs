import { Test, TestSuite, expect, TestCase } from '../../testyCore';

@TestSuite('Expect ToBeTruthy Tests')
export class ExpectToBeTruthy {

    @Test('To be truthy, should succeed', [
        new TestCase('true', true),
        new TestCase(`'0'`, '0'),
        new TestCase(`'false'`, 'false'),
        new TestCase(`empty object`, {}),
        new TestCase(`empty array`, []),
        new TestCase(`empty function`, function () { }),
    ])
    private toBeTruthySuccess(arg) {
        expect.toBeTruthy(arg);
    }

    @Test('To be truthy, should fail', [
        new TestCase('false', false),
        new TestCase('zero', 0),
        new TestCase('empty string', ''),
        new TestCase('null', null),
        new TestCase('undefined', undefined),
        new TestCase('NaN', NaN),
    ])
    private toBeTruthyFail(arg) {
        expect.toThrow(() => {
            expect.toBeTruthy(arg);
        });
    }

    @Test('Not to be truthy, should fail', [
        new TestCase('true', true),
        new TestCase(`'0'`, '0'),
        new TestCase(`'false'`, 'false'),
        new TestCase(`empty object`, {}),
        new TestCase(`empty array`, []),
        new TestCase(`empty function`, function () { }),
    ])
    private notToBeTruthyFail(arg) {
        expect.toThrow(() => {
            expect.not.toBeTruthy(arg);
        });
    }

    @Test('Not to be truthy, should succeed', [
        new TestCase('false', false),
        new TestCase('zero', 0),
        new TestCase('empty string', ''),
        new TestCase('null', null),
        new TestCase('undefined', undefined),
        new TestCase('NaN', NaN)
    ])
    private notToBeTruthySuccess(arg) {
        expect.not.toBeTruthy(arg);
    }
}