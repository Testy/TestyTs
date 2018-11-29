import { TestStatus } from '../testStatus';

export class Test {
    public get status() { return this._status; }

    /**
     * @param func The test function
     * @param status The test's status
     */
    constructor(private func: Function, private _status: TestStatus) { }

    public async run(context) {
        await this.func(context);
    }
}