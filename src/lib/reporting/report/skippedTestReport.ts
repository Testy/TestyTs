import { TestResult } from './testResult';
import { LeafReport } from './leafReport';
import { Logger } from '../../logger/logger';

export class SkippedTestReport extends LeafReport {

    constructor(name: string) {
        super(name, TestResult.Skipped, 0);
    }

    public log(logger: Logger): void {
        logger.warn(`! ${this.name}`);
    }
}