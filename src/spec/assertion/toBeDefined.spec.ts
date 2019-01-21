import { Test, TestSuite, expect } from '../../testyCore';

@TestSuite('Expect ToBeDefined Test Suite')
export class ExpectToBeDefinedTestSuite {

    @Test(`'a' to be defined`)
    private aToBeDefined() {
        expect.toBeDefined('a');
    }

    @Test(`undefined to be defined to fail`)
    private undefinedToBeDefinedToFail() {
        expect.toThrow(() => {
            expect.toBeDefined(undefined);
        });
    }

    @Test(`'a' not to be defined to fail`)
    private aNotToBeDefinedToFail() {
        expect.toThrow(() => {
            expect.not.toBeDefined('a');
        });
    }

    @Test(`undefined not to be defined`)
    private undefinedNotToBeDefinedToFail() {
        expect.not.toBeDefined(undefined);
    }
}