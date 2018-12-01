import { TestsCollection } from '../tests/testsCollection';
import { testSuite } from './testSuite.decorator';

/** 
 * Method which is executed after each test is ran. 
 */
export function afterEach() {
    return (target, key, descriptor) => {
        initializeTarget(target);
        const testSuiteInstance: TestsCollection = target.__testSuiteInstance;
        testSuiteInstance.afterEachMethods.push(descriptor.value);
    };
}

function initializeTarget(target: any) {
    if (!target.__testSuiteInstance) { target.__testSuiteInstance = new TestsCollection(); }
}