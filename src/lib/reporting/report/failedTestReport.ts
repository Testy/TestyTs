import { Report } from './report';
import { TestResult } from './testResult';
import { Logger } from '../../logger/logger';
import { LeafReport } from './leafReport';

export class FailedTestReport extends LeafReport {
    public get message() { return this._message; }

    constructor(name: string, private _message: string, duration: number, private logger?: Logger) {
        super(name, TestResult.Failure, duration);
        if (this.logger) {
            this.logger.failure(`x ${this.name} - ${this.message}`);
        }
    }
}