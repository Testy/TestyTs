import { Report } from './report';
import { ReporterVisitor } from '../reporters/reporter';
import { TestResult } from './testResult';

export class SuccessfulTestReport implements Report {
    public get name() { return this._name; }
    public get duration(): number { return this._duration; }
    public get numberOfTests(): number { return 1; };
    public get result(): TestResult { return TestResult.Success; }

    constructor(private _name: string, private _duration: number) { }

    acceptReporter(reporter: ReporterVisitor) {
        reporter.visitSuccesfulTestReport(this);
    }
}