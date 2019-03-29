import { TestSuiteInstance } from "../tests/testSuite";

export function getTestSuiteInstance(target: any): TestSuiteInstance {
    if (!target.__testSuiteInstance) {
        target.__testSuiteInstance = new TestSuiteInstance();
    }
    else {
        target.__testSuiteInstance = (target.__testSuiteInstance as TestSuiteInstance).clone();
    }

    return target.__testSuiteInstance;
}