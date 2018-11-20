import { TestResult } from './testResult';
import { Logger } from '../../logger/logger';
import { LeafReport } from './leafReport';

export class SkippedTestReport extends LeafReport {

    constructor(name: string, private logger?: Logger) {
        super(name, TestResult.Skipped, 0);
        if (this.logger) {
            this.logger.warn(`! ${this.name}`);
        }
    }
}