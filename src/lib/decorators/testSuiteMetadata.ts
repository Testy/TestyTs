export class TestSuiteMetadata {
    /** We use an arbitrarily long name to void overriding something by accident. */
    private static metadataPropertyName = 'metadata_c320a151-eedc-4cb3-8616-863322c083b3';

    public tests = {};
    public focusedTests = {};
    public ignoredTests = [];
    public beforeAll: Array<() => any> = [];
    public beforeEach: Array<() => any> = [];
    public afterEach: Array<() => any> = [];
    public afterAll: Array<() => any> = [];

    public static getMetadataStore(target: any): TestSuiteMetadata {
        if (!target[TestSuiteMetadata.metadataPropertyName])
            target[TestSuiteMetadata.metadataPropertyName] = new TestSuiteMetadata();

        return target[TestSuiteMetadata.metadataPropertyName];
    }
}