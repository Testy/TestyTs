import { Test, TestSuite } from 'testyts';

@TestSuite()
export class GithubReporterTests {
  @Test()
  public test() {
    this.printDebug('Testing 1 2 1 2!');
    this.printAnnotation('notice', 'README.md', 0, 0, 'Ceci est mon titre', 'Ceci est mon message');
    this.printAnnotation('warning', 'README.md', 0, 0, 'Ceci est mon titre', 'Ceci est mon message');
    this.printAnnotation('error', 'README.md', 0, 0, 'Ceci est mon titre', 'Ceci est mon message');
  }

  private printDebug(message: string) {
    console.log(`::debug::${message}`);
  }

  private printAnnotation(
    type: 'warning' | 'error' | 'notice',
    file: string,
    line: number | null,
    endline: number | null,
    title: string,
    message: string
  ) {
    console.log(
      `::${type} file=${file || ''},line=${line || 0},endline=${endline || 0},title=${title || ''}::${message}`
    );
  }
}
