import { Command } from 'commander';
import { Logger } from '../logger/logger';
import { TestVisitorFactory } from '../tests/visitors/testVisitor.factory';
import { CliCommand } from './cliCommand';
import { InitCommand } from './init.command';
import { NopCommand } from './nopCommand';
import { RunCommand } from './run.command';
import * as Commander from 'commander';

export class TestyCli {
    constructor(private logger: Logger, private testVisitorFactory: TestVisitorFactory) { }

    public async handle(args: any[]) {
        const command = await this.getCommand(args);
        try {
            await command.execute();
        }
        catch (err) {
            this.logger.error(`An error occured while executing the following command: ${command}. Error: "${err.message}"`);
        }
    }

    public getCommand(args: any[]) {

        return new Promise<CliCommand>(resolve => {
            const program = new Commander.Command();

            program
                .command('init')
                .description('Creates a default testy.json config file.')
                .action(() => resolve(new InitCommand(this.logger)));

            program
                .option('-c --config <config>', 'Specify a config file.', './testy.json')
                .option('-t --tsconfig <tsconfig>', 'Specify a tsconfig config file.', './tsconfig.json')
                .option('-r --reporter <reporter>', 'Specifies the reporter type', /(standard|TAP)/, 'standard')

            program.parse(args);

            if(program._name === '-c' || program._name === '--config' && program.args.length > 0) {
                program.config = program.args[0];
            }
            const testRunner = this.testVisitorFactory.getRunner(program.reporter);
            resolve(new RunCommand(this.logger, testRunner, program.config, program.tsconfig));
        });
    }
}