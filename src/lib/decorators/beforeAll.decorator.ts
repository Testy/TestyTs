import { TestSuite } from '../tests/testSuite';

/**
 * Method which is executed before all the tests are ran.
 */
export function beforeAll() {
    return (target, key, descriptor) => {
        initializeTarget(target);
        const testSuiteInstance: TestSuite = target.__testSuiteInstance;
        testSuiteInstance.beforeAllMethods.push(descriptor.value);
    };
}

function initializeTarget(target: any) {
    if (!target.__testSuiteInstance) { target.__testSuiteInstance = new TestSuite(); }
}