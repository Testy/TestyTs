import { TestResult } from './testResult';

/**
 * report's interface. Interface of a composite pattern.
 */
export interface Report {
  name: string;
  result: TestResult;
  duration: number;
  numberOfTests: number;
  numberOfSuccessfulTests: number;
  numberOfSkippedTests: number;
}
