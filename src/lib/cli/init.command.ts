import { CliCommand } from './cliCommand';
import { writeFile } from 'fs';
import { resolve } from 'path';
import { TestyConfig } from '../interfaces/config';
import { Logger } from '../logger/logger';

export class InitCommand implements CliCommand {

    private readonly defaultConfig: TestyConfig = {
        include: ['**/*.spec.ts']
    };

    constructor(private logger: Logger) { }

    public execute(): void {
        const path = resolve(process.cwd(), 'testy.json');
        writeFile(path, JSON.stringify(this.defaultConfig), (err) => {
            if (!err)
                return;

            this.logger.info(err.message);
            process.exit(1);
        });
    }
}