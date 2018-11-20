import { Report } from '../report/report';
import { CompositeReport } from '../report/compositeReport';
import { SuccessfulTestReport } from '../report/successfulTestReport';
import { FailedTestReport } from '../report/failedTestReport';
import { SkippedTestReport } from '../report/skippedTestReport';

export interface ReporterVisitor {
    visitSuccesfulTestReport(report: SuccessfulTestReport);
    visitFailedTestReport(report: FailedTestReport);
    visitSkippedTestReport(report: SkippedTestReport);
    visitCompositeReport(report: CompositeReport);
    visitRootReport(report: CompositeReport);
}