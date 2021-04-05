import { TestResult } from './testResult';
import { LeafReport } from './leafReport';

export class FailedTestReport extends LeafReport {
  public get message() {
    return this._message;
  }

  constructor(name: string, private _message: string, duration: number) {
    super(name, TestResult.Failure, duration);
  }
}
