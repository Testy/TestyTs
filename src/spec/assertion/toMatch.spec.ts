import { Test, TestSuite, expect } from '../../testyCore';

@TestSuite('Expect ToMatch Tests')
export class ExpectToMatch {
    @Test(`'hello' to match /[a-z]/, should succeed`)
    private helloToMatchSuccess() {
        expect.toMatch('hello', /[a-z]/);
    }

    @Test(`'hello' to match /[A-Z]/, should fail`)
    private helloToMatchFail() {
        expect.toThrow(() => {
            expect.toMatch('hello', /[A-Z]/);
        });
    }

    @Test(`'hello' not to match /[a-z]/, should fail`)
    private helloNotToMatchFail() {
        expect.toThrow(() => {
            expect.not.toMatch('hello', /[a-z]/);
        });
    }

    @Test(`'hello' not to match /[A-Z]/, should fail`)
    private helloNotToMatchSuccess() {
        expect.not.toMatch('hello', /[A-Z]/);
    }
}