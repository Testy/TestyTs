import { Report } from './report';
import { TestResult } from './testResult';
import { Logger } from '../../logger/logger';

/**
 * Represents a collection of reports. Part of a composite pattern.
 */
export class CompositeReport implements Report {
    public get name(): string { return this._name; }
    public get message(): string { return undefined; }
    public get duration(): number { return this.children.reduce((a, b) => a + b.duration, 0); }
    public get numberOfTests(): number { return this.children.reduce((a, b) => a + b.numberOfTests, 0); }
    public get numberOfSuccessfulTests(): number { return this.children.reduce((a, b) => a + b.numberOfSuccessfulTests, 0); }
    public get numberOfSkippedTests(): number { return this.children.reduce((a, b) => a + b.numberOfSkippedTests, 0); }

    public get result(): TestResult {
        if (this.children.find(x => x.result === TestResult.Failure) !== undefined)
            return TestResult.Failure;

        if (this.children.find(x => x.result === TestResult.Skipped) !== undefined)
            return TestResult.Skipped;

        return TestResult.Success;
    }

    private children: Report[] = [];

    constructor(private _name: string, protected logger?: Logger) {
        if (this.logger) {
            this.logger.info(this.name);
        }
    }

    public addReport(report: Report) {
        this.children.push(report);
    }

    public getChildren() {
        return this.children;
    }
}