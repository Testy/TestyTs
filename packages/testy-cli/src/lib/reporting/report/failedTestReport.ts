import { TestResult } from './testResult';
import { LeafReport } from './leafReport';

export class FailedTestReport extends LeafReport {
  public get message() {
    return this._message;
  }

  public get stack() {
    return this._stack;
  }

  constructor(name: string, private _message: string, private _stack: string, duration: number) {
    super(name, TestResult.Failure, duration);
  }
}
