import { expect } from '@testy/assertion';
import { CompositeReport } from '../../lib/reporting/report/compositeReport';
import { FailedTestReport } from '../../lib/reporting/report/failedTestReport';
import { LeafReport } from '../../lib/reporting/report/leafReport';
import { Report } from '../../lib/reporting/report/report';
import { TestSuiteInstance } from '../../lib/tests/testSuite';

export class TestUtils {
  public static getInstance(testClass: any): TestSuiteInstance {
    return testClass.__testSuiteInstance;
  }

  public static expectReportsToBeEqual(actualReport: Report, expectedReport: Report) {
    this.expectSameType(actualReport, expectedReport);
    expect.toBeEqual(actualReport.result, expectedReport.result);
    expect.toBeEqual(actualReport.name, expectedReport.name);

    if (actualReport instanceof FailedTestReport) {
      expect.toBeEqual(actualReport.message, (expectedReport as FailedTestReport).message);
    }

    if (actualReport instanceof LeafReport) return;

    const actualChildren = (actualReport as CompositeReport).getChildren();
    const expectedChildren = (expectedReport as CompositeReport).getChildren();

    for (const i in actualChildren) {
      this.expectReportsToBeEqual(actualChildren[i], expectedChildren[i]);
    }
  }

  public static expectSameType(actualReport: any, expectedReport: any) {
    return expect.toBeEqual(actualReport.constructor, expectedReport.constructor);
  }
}
