import { TestSuite } from '../tests/testSuite';

/** 
 * Method which is executed after all the tests were ran. 
 */
export function afterAll() {
    return (target, key, descriptor) => {
        getTestSuiteInstance(target).afterAllMethods.push(descriptor.value);
    };
}

/** 
 * Method which is executed after each test is ran. 
 */
export function afterEach() {
    return (target, key, descriptor) => {
        getTestSuiteInstance(target).afterEachMethods.push(descriptor.value);
    };
}

/**
 * Method which is executed before all the tests are ran.
 */
export function beforeAll() {
    return (target, key, descriptor) => {
        getTestSuiteInstance(target).beforeAllMethods.push(descriptor.value);
    };
}

/** 
 * Method which is executed before each test is ran.
 */
export function beforeEach() {
    return (target, key, descriptor) => {
        getTestSuiteInstance(target).beforeEachMethods.push(descriptor.value);
    };
}


function getTestSuiteInstance(target: any) {
    if (!target.__testSuiteInstance) {
        target.__testSuiteInstance = new TestSuite();
    }
    else {
        target.__testSuiteInstance = (target.__testSuiteInstance as TestSuite).clone();
    }

    return target.__testSuiteInstance;
}