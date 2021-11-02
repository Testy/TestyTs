import { writeFile } from 'fs';
import { resolve } from 'path';
import { defaultTestyConfig } from '../interfaces/config';
import { Logger } from '../logger/logger';
import { CliCommand } from './cli.command';

export class InitCommand implements CliCommand {
  constructor(private logger: Logger) {}

  public async execute(): Promise<void> {
    const path = resolve(process.cwd(), 'testy.json');
    writeFile(path, JSON.stringify(defaultTestyConfig), (err) => {
      if (!err) {
        return;
      }

      this.logger.info(err.message);
      process.exit(1);
    });
  }
}
