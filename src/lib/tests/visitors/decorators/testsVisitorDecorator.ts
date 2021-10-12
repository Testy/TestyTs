import { TestVisitor } from '../testVisitor';
import { TestInstance } from '../../test';
import { TestSuiteInstance } from '../../testSuite';
import { RootTestSuite } from '../../rootTestSuite';

type VisitTestFunc<T> = (test: TestInstance) => Promise<T>;
type VisitTestSuiteFunc<T> = (testSuite: TestSuiteInstance) => Promise<T>;
type VisitRootTestSuiteFunc<T> = (testSuite: TestSuiteInstance) => Promise<T>;

export abstract class TestsVisitorDecorator<T> implements TestVisitor<T> {
  protected baseVisitTest: VisitTestFunc<T>;
  protected baseVisitTestSuite: VisitTestSuiteFunc<T>;
  protected baseVisitRootTestSuite: VisitRootTestSuiteFunc<T>;

  constructor(private baseVisitor: TestVisitor<T>) {
    this.baseVisitTest = this.baseVisitor.visitTest.bind(this.baseVisitor);
    this.baseVisitTestSuite = this.baseVisitor.visitTestSuite.bind(this.baseVisitor);
    this.baseVisitRootTestSuite = this.baseVisitor.visitRootTestSuite.bind(this.baseVisitor);

    this.propagate(this.visitTest.bind(this), this.visitTestSuite.bind(this), this.visitRootTestSuite.bind(this));
  }

  abstract visitTest(test: TestInstance): Promise<T>;
  abstract visitTestSuite(test: TestSuiteInstance): Promise<T>;
  abstract visitRootTestSuite(test: RootTestSuite): Promise<T>;

  private propagate(
    visitTest: VisitTestFunc<T>,
    visitTestSuite: VisitTestSuiteFunc<T>,
    visitRootTestSuite: VisitRootTestSuiteFunc<T>
  ) {
    if (this.baseVisitor instanceof TestsVisitorDecorator) {
      this.baseVisitor.propagate(
        this.visitTest.bind(this),
        this.visitTestSuite.bind(this),
        this.visitRootTestSuite.bind(this)
      );
    } else {
      this.baseVisitor.visitTest = visitTest;
      this.baseVisitor.visitTestSuite = visitTestSuite;
      this.baseVisitor.visitRootTestSuite = visitRootTestSuite;
    }
  }
}
