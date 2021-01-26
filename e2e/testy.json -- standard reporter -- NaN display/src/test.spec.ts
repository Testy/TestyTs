import { expect, Test, XTest, TestSuite } from 'testyts';

@TestSuite()
export class MyTestSuite {

  @Test()
  public test() {
      expect.toBeEqual(NaN, 0);
  }
}