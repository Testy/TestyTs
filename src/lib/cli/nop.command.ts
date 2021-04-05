import { CliCommand } from './cli.command';

export class NopCommand implements CliCommand {
  constructor() {}

  public async execute(): Promise<void> {}
}
