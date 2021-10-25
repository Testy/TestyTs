import { CliCommand } from './cli.command';

export class NopCommand implements CliCommand {
  constructor() {
    // This is not an empty constructor!
  }

  public async execute(): Promise<void> {
    // I do nothing!
  }
}
