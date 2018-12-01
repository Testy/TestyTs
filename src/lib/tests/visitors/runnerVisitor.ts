import { TestsCollection } from '../testsCollection';
import { Test } from '../test';
import { TestVisitor } from './testVisitor';
import { Logger } from '../../logger/logger';

export class RunnerVisitor implements TestVisitor {
    constructor(private logger: Logger) { }

    public visitTestCollection(testCollection: TestsCollection) {
        console.log('lel');
        this.logger.info(testCollection.name);
        this.logger.increaseIndentation();

        for (const id of testCollection.testIds) {
            testCollection.get(id).accept(this);
        }
    }

    public visitTest(test: Test) {
        this.logger.info(test.name);
    }
}