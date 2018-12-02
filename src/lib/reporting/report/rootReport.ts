import { CompositeReport } from './compositeReport';
import { Logger } from '../../logger/logger';

/**
 * Represents a collection of reports. Also contains a method to log the test statistics.
 */
export class RootReport extends CompositeReport {
    constructor() {
        super('Root');
    }

    public printStatistics(logger: Logger) {
        logger.info();

        if (this.numberOfTests === this.numberOfSuccessfulTests) {
            logger.success(`Test run successful.`);
        }
        else if (this.numberOfTests === this.numberOfSuccessfulTests + this.numberOfSkippedTests) {
            logger.warn(`Test run successful, but some tests were skipped.`);
        }
        else {
            logger.failure(`Test run failure.`);
        }

        const numberOfFailedTests = this.numberOfTests - this.numberOfSuccessfulTests - this.numberOfSkippedTests;
        logger.info(`${this.numberOfSuccessfulTests}/${this.numberOfTests} passed. ${numberOfFailedTests} failed. ${this.numberOfSkippedTests} skipped.`);
        logger.info(`Total duration: ${Math.round(this.duration) / 1000} s`);
    }
}