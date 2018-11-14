import { Report } from './report';
import { ReporterVisitor } from '../reporters/reporter';
import { TestResult } from './testResult';

export class SkippedTestReport implements Report {
    public get name(): string { return this._name; }
    public get duration(): number { return 0; }
    public get numberOfTests(): number { return 1; }
    public get result(): TestResult { return TestResult.Skipped; }

    constructor(private _name: string) { }

    acceptReporter(reporter: ReporterVisitor) {
        reporter.visitSkippedTestReport(this);
    }
}