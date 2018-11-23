import { test, testSuite, expect } from '../../testyCore';

@testSuite('Expect ToMatch Tests')
export class ExpectToMatch {
    @test(`'hello' to match /[a-z]/, should succeed`)
    private helloToMatchSuccess() {
        expect.toMatch('hello', /[a-z]/);
    }

    @test(`'hello' to match /[A-Z]/, should fail`)
    private helloToMatchFail() {
        expect.toThrow(() => {
            expect.toMatch('hello', /[A-Z]/);
        });
    }

    @test(`'hello' not to match /[a-z]/, should fail`)
    private helloNotToMatchFail() {
        expect.toThrow(() => {
            expect.not.toMatch('hello', /[a-z]/);
        });
    }

    @test(`'hello' not to match /[A-Z]/, should fail`)
    private helloNotToMatchSuccess() {
        expect.not.toMatch('hello', /[A-Z]/);
    }
}