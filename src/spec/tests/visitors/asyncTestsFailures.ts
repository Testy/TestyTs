import { TestSuite } from '../../../lib/decorators/testSuite.decorator';
import { Test } from '../../../testyCore';
import { Timeout } from '../../../lib/decorators/timeout.decorator';

@TestSuite()
export class AsyncTestsFailures {

    @Test()
    @Timeout(0)
    async testA() {
        await new Promise(() => { });
    }

    @Test()
    async testC() {
        await new Promise((res, rej) => rej('Some rejection message!'));
    }

    @Test()
    async testD() {
        await new Promise(() => { throw new Error('Some error!'); });
    }
}