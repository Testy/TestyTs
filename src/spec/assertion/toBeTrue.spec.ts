import { Test, TestSuite, expect, TestCase } from '../../testyCore';

@TestSuite('Expect ToBeTrue Tests')
export class ExpectToBeTrue {

    @Test('true to be true')
    private trueToBeTrue() {
        expect.toBeTrue(true);
    }

    @Test('true not to be true to fail')
    private trueNotToBeTrue() {
        expect.toThrow(() => {
            expect.not.toBeTrue(true);
        });
    }

    @Test('To be true, should fail', [
        new TestCase('false', false),
        new TestCase('undefined', undefined),
        new TestCase('null', null),
    ])
    private toBeTrueFail(arg) {
        expect.toThrow(() => {
            expect.toBeTrue(arg);
        });
    }

    @Test('Not to be true, should succeed', [
        new TestCase('false', false),
        new TestCase('undefined', undefined),
        new TestCase('null', null),
    ])
    private notToBeTrueSuccess(arg) {
        expect.not.toBeTrue(arg);
    }
}