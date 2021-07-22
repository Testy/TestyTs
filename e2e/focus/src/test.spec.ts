import { expect, Test, TestSuite } from 'testyts';

@TestSuite()
export class TestSuite1 {
  @Test()
  public test1() {
    // Assert
    expect.toBeEqual(1 + 1, 2);
  }

  @Test.focus()
  public test2() {
    // Assert
    expect.toBeEqual(1 + 1, 2);
  }
}

@TestSuite.focus()
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
