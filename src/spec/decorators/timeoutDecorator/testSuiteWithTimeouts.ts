import { Test } from '../../../testyCore';
import { TestSuite } from '../../../lib/decorators/testSuite.decorator';
import { Timeout } from '../../../lib/decorators/timeout.decorator';

@TestSuite()
export class TestSuiteWithTimeouts {
  @Test()
  @Timeout(0)
  private async test1() {
    return Promise.resolve();
  }

  @Test()
  @Timeout(0)
  private async test2() {
    return new Promise<void>((res) => {
      setTimeout(() => res(), 100);
    });
  }
}
