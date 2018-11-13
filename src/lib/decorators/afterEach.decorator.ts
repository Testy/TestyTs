import { TestSuiteMetadata } from './testSuiteMetadata';

/** 
 * Method which is executed after each test is ran. 
 */
export function afterEach() {
    return (target, key, descriptor) => {
        const metadata = TestSuiteMetadata.getMetadataStore(target);
        metadata.afterEach = descriptor.value;
    };
}