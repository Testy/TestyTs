import * as tsnode from 'ts-node';
import { TestyConfig } from '../interfaces/config';
import { Logger } from '../logger/logger';
import { Report } from '../reporting/report/report';
import { TestVisitor } from '../tests/visitors/testVisitor';
import { JsonLoader } from '../utils/jsonLoader.service';
import { TestsLoader } from '../utils/testsLoader';
import { CliCommand } from './cli.command';

export class RunCommand implements CliCommand {
  public get tsConfigFile(): string {
    return this._tsConfigFile;
  }

  public get testFiles() {
    return this._testFiles;
  }

  constructor(
    private logger: Logger,
    private testRunnerVisitor: TestVisitor<Report>,
    private jsonLoader: JsonLoader,
    private testLoader: TestsLoader,
    private testyConfig: TestyConfig,
    private _tsConfigFile,
    private _testFiles: string[] = null
  ) {}

  public async execute() {
    // We load the tsConfig file. In priority order, we use
    // 1. The tsconfig file specified from the command line
    // 2. The tsconfig file specified in the testy config file
    // 3. The root folder's tsconfig.json file
    let tsConfigPath = this.tsConfigFile;
    if (tsConfigPath == null) {
      tsConfigPath = this.testyConfig.tsconfig;
    }

    if (tsConfigPath == null) {
      tsConfigPath = 'tsconfig.json';
    }

    const tsConfig = await this.jsonLoader.load<tsnode.TsConfigOptions>(tsConfigPath);
    const testSuites = await this.testLoader.loadTests(
      process.cwd(),
      this._testFiles ?? this.testyConfig.include,
      tsConfig
    );

    if (testSuites == null) {
      this.logger.warn('Test suites instance is null.');
    } else {
      await testSuites.accept(this.testRunnerVisitor);
    }
  }
}
