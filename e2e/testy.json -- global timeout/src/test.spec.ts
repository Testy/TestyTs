import { expect, Test, TestSuite } from 'testyts';

@TestSuite()
export class MyTestSuite {
  @Test()
  public async myTest() {
    // Act
    await this.wait(2500);

    // Assert
    expect.toBeEqual(1 + 1, 2);
  }

  private wait(timeout: number) {
    return new Promise((resolve) => setTimeout(() => resolve(), 3000));
  }
}
