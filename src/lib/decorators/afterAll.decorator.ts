import { TestSuiteMetadata } from './testSuiteMetadata';

/** 
 * Method which is executed after all the tests were ran. 
 */
export function afterAll() {
    return (target, key, descriptor) => {
        const metadata = TestSuiteMetadata.getMetadataStore(target);
        metadata.afterAll = descriptor.value;
    };
}