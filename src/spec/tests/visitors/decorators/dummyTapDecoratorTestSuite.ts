import { TestSuite } from '../../../../lib/decorators/testSuite.decorator';
import { Test, XTest } from '../../../../lib/decorators/test.decorator';
import { expect } from '@testy/assertion';
import { TestCase } from '../../../../lib/decorators/testCase.decorator';

@TestSuite()
export class DummyTapDecoratorTestSuite {
    @Test()
    testA() { }

    @Test()
    testB() { }

    @Test()
    testC() { expect.toBeTrue(false); }

    @Test()
    @TestCase('TestD.A', true)
    @TestCase('TestD.B', true)
    @TestCase('TestD.C', false)
    @TestCase('TestD.D', false)
    testD(shouldPass: boolean) { expect.toBeTrue(shouldPass); }

    @XTest('#testE')
    testE() { }
}

export const dummyTapDecoratorTestSuiteExpectedOutput: string[] = ['ok 1 testA',
    'ok 2 testB',
    'not ok 3 testC',
    'not ok 4 TestD.D',
    'not ok 5 TestD.C',
    'ok 6 TestD.B',
    'ok 7 TestD.A',
    'ok 8 testE # SKIP'
];