import {
  Report,
  RootTestSuite,
  TestInstance,
  TestSuiteInstance,
  TestsVisitorDecorator,
  TestVisitor,
  Logger,
} from '@testy/core';

export class GitHubActionsReporter extends TestsVisitorDecorator<Report> {
  constructor(baseVisitor: TestVisitor<Report>, private logger: Logger) {
    super(baseVisitor);
  }

  public async visitTest(test: TestInstance): Promise<Report> {
    console.log(test);
    return Promise.resolve(null);
  }

  public async visitTestSuite(test: TestSuiteInstance): Promise<Report> {
    console.log(test);
    return Promise.resolve(null);
  }

  public async visitRootTestSuite(test: RootTestSuite): Promise<Report> {
    console.log(test);
    return Promise.resolve(null);
  }

  private printAnnotation(
    type: 'warning' | 'error',
    file: string,
    line: number | null,
    title: string,
    message: string
  ) {
    console.log(`::${type} file=${file || ''},line=${line || ''},title=${title || ''}::${message}`);
  }
}
