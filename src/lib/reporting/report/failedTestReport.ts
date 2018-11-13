import { Report } from './report';
import { ReporterVisitor } from '../reporters/reporter';
import { TestResult } from './testResult';

export class FailedTestReport implements Report {
    public get name() { return this._name; }
    public get message() { return this._message; }
    public get duration(): number { return this._duration; }
    public get numberOfTests(): number { return 1; };
    public get result(): TestResult { return TestResult.Failure; }

    constructor(private _name: string, private _message: string, private _duration: number) { }

    acceptReporter(reporter: ReporterVisitor) {
        reporter.visitFailedTestReport(this);
    }
}