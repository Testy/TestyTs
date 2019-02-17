import { Logger } from '../logger/logger';
import * as program from 'commander';
import { InitCommand } from './init.command';
import { RunCommand } from './run.command';
import { CliCommand } from './cliCommand';
import { NopCommand } from './nopCommand';
import { TestVisitorFactory, ReporterType } from '../tests/visitors/testVisitor.factory';

export class TestyCli {
    constructor(private logger: Logger, private testVisitorFactory: TestVisitorFactory) { }

    public async handle(args: any[]) {
        const command = await this.getCommand(args);
        try {
            await command.execute();
        }
        catch (err) {
            this.logger.error(err.message);
        }
    }

    public getCommand(args: any[]) {

        return new Promise<CliCommand>(resolve => {
            program
                .command('init')
                .description('Creates a default testy.json config file.')
                .action(() => resolve(new InitCommand(this.logger)));

            program
                .option('-c --config', 'Specify a config file.', './testy.json')
                .option('-r --reporter [type]', 'Specifies the reporter type', /(standard|TAP)/, 'standard')
                .action((config: string, cmd) => {
                    const testRunner = this.testVisitorFactory.getRunner(cmd.reporter);
                    resolve(new RunCommand(this.logger, testRunner, config));
                });

            program
                .command('*')
                .action(() => resolve(new NopCommand()));

            program.parse(args);
            if (program.args.length === 0) {
                const testRunner = this.testVisitorFactory.getRunner('standard');
                resolve(new RunCommand(this.logger, testRunner));
            }
        });
    }
}