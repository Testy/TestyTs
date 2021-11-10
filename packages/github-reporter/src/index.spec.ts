import { Test, TestSuite } from 'testyts';

@TestSuite()
export class GithubReporterTests {
  @Test()
  public test() {
    console.log('::error file=readme.md,line=1,title=Buonjiorno::This is a beautiful message z');
  }
}
