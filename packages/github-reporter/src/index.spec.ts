import { Test, TestSuite } from 'testyts';

@TestSuite()
export class GithubReporterTests {
  @Test()
  public test() {
    throw new Error('Ça a fail pour ça');
  }

  @Test()
  public myTestTWo() {
    console.log('ok!');
  }

  @Test()
  public otherTest() {
    // Empty
  }
}
