import { testSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { expect } from '../../lib/assertion/expect';

@testSuite('Expect ToBeTrue Tests')
class ExpectToBeTrue {
    @test('true to be true')
    private expectTrueToBeTrue() {
        expect.toBeTrue(true);
    }

    @test('false to be true to fail')
    private falseToBeTrueFails() {
        expect.toThrow(() => {
            expect.toBeTrue(false);
        });
    }

    @test('undefined to be true to fail')
    private undefinedToBeTrueFails() {
        expect.toThrow(() => {
            expect.toBeTrue(undefined);
        });
    }

    @test('false not to be true')
    private falseNotToBeTrue() {
        expect.not.toBeTrue(false);
    }

    @test('true not to be true to fail')
    private trueNotToBeTrue() {
        expect.toThrow(() => {
            expect.not.toBeTrue(true);
        });
    }

    @test('undefined not to be true')
    private undefinedNotToBeTrue() {
        expect.not.toBeTrue(undefined);
    }
}