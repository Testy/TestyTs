import { TestSuite } from '../tests/testSuite';

/** 
 * Method which is executed before each test is ran.
 */
export function beforeEach() {
    return (target, key, descriptor) => {
        initializeTarget(target);
        const testSuiteInstance: TestSuite = target.__testSuiteInstance;
        testSuiteInstance.beforeEachMethods.push(descriptor.value);
    };
}

function initializeTarget(target: any) {
    if (!target.__testSuiteInstance) { target.__testSuiteInstance = new TestSuite(); }
}