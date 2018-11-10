export interface TestSuite {
    readonly name: string;
    readonly flag: TestFlags;

    run(): Promise<void>;
}

export enum TestFlags { None, Focused, Ignored }