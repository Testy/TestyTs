import { Test } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';

@TestSuite()
export class SyncTestsFailures {
  @Test()
  error() {
    throw new Error('Some error!');
  }
}
