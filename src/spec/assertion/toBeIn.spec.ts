import { test, testSuite, expect, ftestSuite } from '../../testyCore';

@testSuite('Expect ToBeIn Tests')
class ExpectToMatch {
    @test(`'a' to be in, should succeed`)
    private aToBeInSuccess() {
        expect.toBeIn('a', ['a', 'b', 'c']);
    }

    @test(`'a' to be in, should fail`)
    private aToBeInFail() {
        expect.toThrow(() => {
            expect.toBeIn('a', ['b', 'c', 'd']);
        });
    }

    @test(`'a' not to be in, should fail`)
    private aNotToBeInFail() {
        expect.toThrow(() => {
            expect.not.toBeIn('a', ['a', 'b', 'c']);
        });
    }

    @test(`'a' not to be in, should succeed`)
    private aNotToBeInSuccess() {
        expect.not.toBeIn('a', ['b', 'c', 'd']);
    }
}