import { TestSuiteInstance } from '../../lib/tests/testSuite';

export class TestClassUtils {
    public static getInstance(testClass: any): TestSuiteInstance {
        return testClass.__testSuiteInstance;
    }
}