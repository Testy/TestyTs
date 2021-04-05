import { expect, Test, TestSuite } from 'testyts';
import { someConstant } from 'path-mapped-stuff/some-file';

@TestSuite()
export class MyTestSuite {
  @Test()
  public myTest() {
    // Assert
    expect.toBeEqual(3, someConstant);
  }
}
