import { Logger } from '../logger/logger';
import * as program from 'commander';
import { InitCommand } from './init.command';
import { RunCommand } from './run.command';
import { CliCommand } from './cliCommand';
import { NopCommand } from './nopCommand';

export class TestyCli {
    constructor(private logger: Logger) { }

    public async handle(args: any[]) {
        const command = await this.getCommand(args);
        try {
            await command.execute();
        }
        catch (err) {
            this.logger.info(err.message);
        }
    }

    public getCommand(args: any[]) {

        return new Promise<CliCommand>(resolve => {
            program
                .command('init')
                .description('Creates a default testy.json config file.')
                .action(() => resolve(new InitCommand(this.logger)));

            program
                .option('-c --config', 'Specify a config file.')
                .action(config => resolve(new RunCommand(this.logger, config)));

            program
                .command('*')
                .action(() => resolve(new NopCommand()));
            program.parse(args);
            if (program.args.length === 0) {
                resolve(new RunCommand(this.logger));
            }
        });
    }
}