import { expect, Test, TestSuite } from 'testyts';

@TestSuite()
export class TestSuite1 {
  @Test()
  public test1() {
    // Assert
    expect.toBeEqual(1 + 1, 2);
  }

  @Test.ignore()
  public test2() {
    // Assert
    expect.toBeEqual(1 + 1, 2);
  }
}

@TestSuite.ignore()
export class TestSuite2 {
  @Test.ignore()
  public test1() {
    // Assert
    expect.toBeEqual(1 + 1, 2);
  }

  @Test()
  public test2() {
    // Assert
    expect.toBeEqual(1 + 1, 2);
  }
}
