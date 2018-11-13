import { TestSuiteMetadata } from './testSuiteMetadata';

/** 
 * Method which is executed before each test is ran.
 */
export function beforeEach() {
    return (target, key, descriptor) => {
        const metadata = TestSuiteMetadata.getMetadataStore(target);
        metadata.beforeEach = descriptor.value;
    };
}