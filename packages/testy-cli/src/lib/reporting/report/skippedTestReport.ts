import { TestResult } from './testResult';
import { LeafReport } from './leafReport';

export class SkippedTestReport extends LeafReport {
  constructor(name: string) {
    super(name, TestResult.Skipped, 0);
  }
}
