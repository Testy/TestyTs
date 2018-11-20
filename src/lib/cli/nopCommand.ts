import { CliCommand } from './cliCommand';

export class NopCommand implements CliCommand {

    constructor() { }

    public execute(): void { }
}