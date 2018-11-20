import { ReporterVisitor } from '../reporters/reporter';
import { CompositeReport } from './compositeReport';

/**
 * Represents a collection of reports. Part of a composite pattern.
 */
export class RootReport extends CompositeReport {
    public acceptReporter(reporter: ReporterVisitor) {
        reporter.visitRootReport(this);
    }
}