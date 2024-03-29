import { getTestSuiteInstance } from './utils';

/**
 * method which is executed after all the tests were ran.
 */
export function AfterAll() {
  return (target, key, descriptor) => {
    getTestSuiteInstance(target).afterAllMethods.push(descriptor.value);
  };
}

/**
 * method which is executed after each test is ran.
 */
export function AfterEach() {
  return (target, key, descriptor) => {
    getTestSuiteInstance(target).afterEachMethods.push(descriptor.value);
  };
}

/**
 * method which is executed before all the tests are ran.
 */
export function BeforeAll() {
  return (target, key, descriptor) => {
    getTestSuiteInstance(target).beforeAllMethods.push(descriptor.value);
  };
}

/**
 * method which is executed before each test is ran.
 */
export function BeforeEach() {
  return (target, key, descriptor) => {
    getTestSuiteInstance(target).beforeEachMethods.push(descriptor.value);
  };
}

/**
 * @deprecated since 0.7.0. Prefer using the capitalized version.
 * Method which is executed after all the tests were ran.
 */
export function afterAll() {
  return AfterAll();
}

/**
 * @deprecated since 0.7.0. Prefer using the capitalized version.
 * Method which is executed after each test is ran.
 */
export function afterEach() {
  return AfterEach();
}

/**
 * @deprecated since 0.7.0. Prefer using the capitalized version.
 * Method which is executed before all the tests are ran.
 */
export function beforeAll() {
  return BeforeAll();
}

/**
 * @deprecated since 0.7.0. Prefer using the capitalized version.
 * Method which is executed before each test is ran.
 */
export function beforeEach() {
  return BeforeEach();
}
