export interface TestSuite {
    readonly name: string;

    run(): Promise<void>;
}

export enum TestFlags { None, Focused, Ignored }