import { Test } from '../interfaces/test';
import { TestStatus } from '../testStatus';
import { stat } from 'fs';

export class TestsCollection extends Map<string, Test | TestsCollection> {
    public get testNames(): string[] { return Array.from(this.keys()); }

    public activeTests() {
        const focusedTests = this.getTestsMarked(TestStatus.Focused);
        if (focusedTests.testNames.length > 0) {
            return focusedTests;
        }

        return this.getTestsMarked(TestStatus.Normal);
    }

    public skippedTests() {
        const focusedTests = this.focusedTests();
        if (focusedTests.testNames.length === 0) {
            return this.getTestsMarked(TestStatus.Ignored);
        }

        return this.getTestsMarked([TestStatus.Normal, TestStatus.Ignored]);
    }

    private getIgnoredTests() {
        return this.getTestsMarked(TestStatus.Ignored);
    }

    private focusedTests() {
        return this.getTestsMarked(TestStatus.Focused);
    }

    private getTestsMarked(statuses: TestStatus | TestStatus[]) {
        if (!(statuses instanceof Array)) {
            statuses = [statuses];
        }

        const ignoredTests = new TestsCollection();

        this.forEach((test, testId) => {
            if (test instanceof Test) {
                if (this.testHasStatus(test, statuses as TestStatus[])) {
                    ignoredTests.set(testId, test);
                }
            }
            else {
                const subIgnoredTests = test.getTestsMarked(statuses);
                if (subIgnoredTests.testNames.length > 0) {
                    ignoredTests.set(testId, subIgnoredTests);
                }
            }
        });

        return ignoredTests;
    }

    private testHasStatus(test: Test, statuses: TestStatus[]) {
        for (const status of statuses) {
            if (test.status === status) {
                return true;
            }
        }

        return false;
    }
}