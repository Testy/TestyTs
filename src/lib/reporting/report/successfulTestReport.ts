import { TestResult } from './testResult';
import { Logger } from '../../logger/logger';
import { LeafReport } from './leafReport';

export class SuccessfulTestReport extends LeafReport {

    constructor(name: string, duration: number, private logger?: Logger) {
        super(name, TestResult.Success, duration);

        if (this.logger) {
            this.logger.success(`√ ${this.name}`);
        }
    }
}