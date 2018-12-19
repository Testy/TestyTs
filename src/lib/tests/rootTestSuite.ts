import { TestSuite } from './testSuite';
import { TestVisitor } from './visitors/testVisitor';

export class RootTestSuite extends TestSuite {

    constructor() {
        super();
        this.name = 'Root';
    }

    public accept<T>(visitor: TestVisitor<T>) {
        return visitor.visitRootTestSuite(this);
    }
}