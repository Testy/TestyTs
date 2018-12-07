import { TestVisitor } from '../testVisitor';
import { Test } from '../../test';
import { TestSuite } from '../../testSuite';

export abstract class TestsVisitorDecorator<T> implements TestVisitor<T> {
    protected baseVisitTest: (testSuite: Test) => Promise<T>;
    protected baseVisitTestSuite: (testSuite: TestSuite) => Promise<T>;

    constructor(private baseVisitor: TestVisitor<T>) {
        this.baseVisitTest = baseVisitor.visitTest.bind(baseVisitor);
        this.baseVisitTestSuite = baseVisitor.visitTestSuite.bind(baseVisitor);

        this.baseVisitor.visitTest = this.visitTest.bind(this);
        this.baseVisitor.visitTestSuite = this.visitTestSuite.bind(this);
    }

    abstract visitTest(test: Test): Promise<T>;
    abstract visitTestSuite(test: TestSuite): Promise<T>;
}