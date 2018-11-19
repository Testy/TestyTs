import { TestSuiteMetadata } from './testSuiteMetadata';

/**
 * Method which is executed before all the tests are ran.
 */
export function beforeAll() {
    return (target, key, descriptor) => {
        const metadata = TestSuiteMetadata.getMetadataStore(target);
        metadata.beforeAll.push(descriptor.value);
    };
}