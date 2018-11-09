export interface TestSuite {
    readonly name: string;

    run(): Promise<void>;
}