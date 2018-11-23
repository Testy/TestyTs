import { test, testSuite, expect } from '../../testyCore';

@testSuite('Expect ToBeDefined Test Suite')
export class ExpectToBeDefinedTestSuite {

    @test(`'a' to be defined`)
    private aToBeDefined() {
        expect.toBeDefined('a');
    }

    @test(`undefined to be defined to fail`)
    private undefinedToBeDefinedToFail() {
        expect.toThrow(() => {
            expect.toBeDefined(undefined);
        });
    }

    @test(`'a' not to be defined to fail`)
    private aNotToBeDefinedToFail() {
        expect.toThrow(() => {
            expect.not.toBeDefined('a');
        });
    }

    @test(`undefined not to be defined`)
    private undefinedNotToBeDefinedToFail() {
        expect.not.toBeDefined(undefined);
    }
}