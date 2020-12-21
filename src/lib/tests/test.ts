import { TestStatus } from '../testStatus';
import { TestVisitor } from './visitors/testVisitor';
import { TestyConfig } from '../interfaces/config';

export class TestInstance {

  public get name() { return this._name; }
  public get status() { return this._status; }
  public get func() { return this._func; }

  /**
   * @param func The test function
   * @param status The test's status
   */
  constructor(private _name: string, private _func: Function, private _status: TestStatus, private timeout?: number | undefined) { }

  public async run(context, config: TestyConfig) {
    return await new Promise(async (resolve, reject) => {
      try {

        // The timeout is determined like so:
        // 1. If there is a test-level timeout, we use it
        // 2. Otherwise, if there is a global timeout defined in the config, we use it
        // 3. Othersiwe, we default to 2000 ms 
        let timeout = 2000;
        if (config?.timeout != null) timeout = config.timeout;
        if (this.timeout != null) timeout = this.timeout;

        setTimeout(() => reject('Test has timed out.'), timeout);
        await this.func(context);
      }
      catch (err) {
        reject(err);
      }

      resolve();
    });
  }

  public async accept<T>(visitor: TestVisitor<T>): Promise<T> {
    return await visitor.visitTest(this);
  }

  public clone() {
    return new TestInstance(this.name, this._func, this._status, this.timeout);
  }
}