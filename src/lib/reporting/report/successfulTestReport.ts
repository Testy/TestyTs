import { TestResult } from './testResult';
import { Logger } from '../../logger/logger';
import { LeafReport } from './leafReport';

export class SuccessfulTestReport extends LeafReport {

    constructor(name: string, duration: number) {
        super(name, TestResult.Success, duration);
    }

    public log(logger: Logger) {
        logger.success(`√ ${this.name}`);
    }
}