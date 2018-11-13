import { TestRunner } from '../testRunner';
import { LoggerFactory } from '../logger/loggerFactory';
import { TestSuite } from '../testSuite';
import { TestSuitePropertiesAndMethodNamesError } from '../exceptions/TestSuitePropertiesAndMethodNamesError';
import { TestStatus } from '../testStatus';
import { TestSuiteMetadata } from './testSuiteMetadata';

const logger = LoggerFactory.create();

/** 
 * Marks a class as a test suite. 
 * 
 * @param name Name of the test suite, displayed in the test report.
 */
export function testSuite(name: string) {
    return createTestSuiteDecoratorFactory(name, TestStatus.Normal);
}

/** 
 * Marks a class as a focused test suite. If one or more test suites are marked as focused, only the those will be ran.
 * 
 * @param name Name of the test suite, displayed in the test report.
 */
export function ftestSuite(name: string) {
    return createTestSuiteDecoratorFactory(name, TestStatus.Focused);
}

/**
 * Marks a class as an ignored test suite. Its tests will not be ran, but will still show up in the test report.
 * 
 * @param name Name of the test suite, displayed in the test report.
 */
export function xtestSuite(name: string) {
    return createTestSuiteDecoratorFactory(name, TestStatus.Ignored);
}

function createTestSuiteDecoratorFactory(name: string, status: TestStatus) {
    return (constructor: new () => any) => {
        const testSuite = createTestSuite(constructor, name, status);
        TestRunner.testRunner.addTestSuite(testSuite);
    };
}

/** 
 * [WARNING] This class should be used for internal testing. 
 */
export function createTestSuite<T>(constructor: new () => any, name: string, status: TestStatus) {
    const testSuite = new constructor();
    const metadata = TestSuiteMetadata.getMetadataStore(testSuite);
    return new TestSuite<T>(
        name,
        status,
        testSuite,
        metadata.tests,
        metadata.focusedTests,
        metadata.ignoredTests,
        metadata.beforeAll,
        metadata.beforeEach,
        metadata.afterEach,
        metadata.afterAll,
    );

}