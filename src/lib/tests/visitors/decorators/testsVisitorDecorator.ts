import { TestVisitor } from '../testVisitor';
import { TestInstance } from '../../test';
import { TestSuiteInstance } from '../../testSuite';
import { RootTestSuite } from '../../rootTestSuite';

export abstract class TestsVisitorDecorator<T> implements TestVisitor<T> {
    protected baseVisitTest: (testSuite: TestInstance) => Promise<T>;
    protected baseVisitTestSuite: (testSuite: TestSuiteInstance) => Promise<T>;

    constructor(private baseVisitor: TestVisitor<T>) {
        this.baseVisitTest = baseVisitor.visitTest.bind(baseVisitor);
        this.baseVisitTestSuite = baseVisitor.visitTestSuite.bind(baseVisitor);

        this.baseVisitor.visitTest = this.visitTest.bind(this);
        this.baseVisitor.visitTestSuite = this.visitTestSuite.bind(this);
    }

    abstract visitTest(test: TestInstance): Promise<T>;
    abstract visitTestSuite(test: TestSuiteInstance): Promise<T>;
    abstract visitRootTestSuite(test: RootTestSuite): Promise<T>;
}