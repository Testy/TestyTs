import * as Commander from 'commander';
import { Logger } from '../logger/logger';
import { TestVisitorFactory } from '../tests/visitors/testVisitor.factory';
import { CliCommand } from './cli.command';
import { InitCommand } from './init.command';
import { RunCommand } from './run.command';
import { JsonLoader } from '../utils/jsonLoader.service';
import { TestyConfig } from '../interfaces/config';
import { TestsLoader } from '../utils/testsLoader';

export class TestyCli {
  constructor(
    private logger: Logger,
    private testVisitorFactory: TestVisitorFactory,
    private jsonLoader: JsonLoader,
    private testLoader: TestsLoader
  ) {
    // This is not an empty constructor!
  }

  public async handle(args: any[]) {
    const command = await this.getCommand(args);
    try {
      await command.execute();
    } catch (err) {
      const commandStr = args.join(' ');
      this.logger.error(
        `An error occured while executing the following command: ${commandStr}. Error: "${err.message}"`
      );
      process.exitCode = 1;
    }
  }

  public getCommand(args: any[]) {
    return new Promise<CliCommand>(async (resolve) => {
      const program = new Commander.Command();

      program
        .command('init')
        .description('Creates a default testy.json config file.')
        .action(() => resolve(new InitCommand(this.logger)));

      program
        .option('-c --config <config>', 'Specify a config file.', './testy.json')
        .option('-t --tsconfig <tsconfig>', 'Specify a tsconfig config file.', undefined)
        .option('-r --reporters <reporters>', 'List or reporters', undefined)
        .option('--reporter <reporter>', 'Specifies the reporter type (deprecated)', /(standard|TAP)/, undefined)
        .option('-f --files <paths>', 'A comma-separated list of files.', undefined);

      program.parse(args);

      if (program._name === '-c' || (program._name === '--config' && program.args.length > 0)) {
        program.config = program.args[0];
      }

      const testyConfig = await this.jsonLoader.load<TestyConfig>(program.config || 'testy.json');

      if (program.reporters != null) {
        const reporters = program.reporters.split(',').reduce((dict, curr) => {
          dict[curr] = {};
          return dict;
        }, {});
        testyConfig.reporters = reporters;
      }

      if (program.reporter != null) {
        testyConfig.reporter = program.reporter;
      }

      const testRunner = this.testVisitorFactory.getRunner(testyConfig);
      resolve(
        new RunCommand(
          this.logger,
          testRunner,
          this.jsonLoader,
          this.testLoader,
          testyConfig,
          program.tsconfig,
          program.files?.split(',')
        )
      );
    });
  }
}
