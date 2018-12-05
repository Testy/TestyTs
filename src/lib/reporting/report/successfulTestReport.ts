import { TestResult } from './testResult';
import { LeafReport } from './leafReport';

export class SuccessfulTestReport extends LeafReport {

    constructor(name: string, duration: number) {
        super(name, TestResult.Success, duration);
    }
}