import { testSuite } from '../../lib/decorators/testSuite.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { expect } from '../../lib/assertion/expect';

@testSuite('ToBeEqual Test Suite')
class ExpectEqualTestSuite {
    @test('Equals')
    private equal() {
        expect.toBeEqual('a', 'a');
    }

    @test('Not Equal')
    private notEqual() {
        expect.not.toBeEqual('a', 'b');
    }

    @test('Equals Fails')
    private equalFails() {
        expect.toThrow(() => {
            expect.toBeEqual('a', 'b');
        });
    }

    @test('Not Equal Fails')
    private notEqualFails() {
        expect.toThrow(() => {
            expect.not.toBeEqual('a', 'a');
        });
    }
}