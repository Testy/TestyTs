import { ReporterVisitor } from '../reporters/reporter';
import { TestResult } from './testResult';

/**
 * Report's interface. Interface of a composite pattern.
 */
export interface Report {
    name: string;
    result: TestResult;
    duration: number;
    numberOfTests: number;
    acceptReporter(reporter: ReporterVisitor);
}