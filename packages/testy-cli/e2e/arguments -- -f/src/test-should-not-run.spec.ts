import { expect, Test, TestSuite } from 'testyts';

@TestSuite()
export class ShouldNotRunTestSuite {
  @Test()
  public async shouldNotRun() {
    // Assert
    expect.toBeEqual(1 + 1, 2);
  }
}
