import { Report } from './report';
import { TestResult } from './testResult';

export abstract class LeafReport implements Report {

    public get name() { return this._name; }
    public get duration(): number { return this._duration; }
    public get numberOfTests(): number { return 1; }
    public get numberOfSuccessfulTests(): number { return this.result === TestResult.Success ? 1 : 0; }
    public get numberOfSkippedTests(): number { return this.result === TestResult.Skipped ? 1 : 0; }
    public get result(): TestResult { return this._result; }

    constructor(private _name: string, private _result: TestResult, private _duration: number) { }
}