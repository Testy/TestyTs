import { TestsCollection } from '../tests/testsCollection';

/** 
 * Method which is executed after all the tests were ran. 
 */
export function afterAll() {
    return (target, key, descriptor) => {
        initializeTarget(target);
        const testSuiteInstance: TestsCollection = target.__testSuiteInstance;
        testSuiteInstance.afterAllMethods.push(descriptor.value);
    };
}

function initializeTarget(target: any) {
    if (!target.__testSuiteInstance) { target.__testSuiteInstance = new TestsCollection(); }
}