export interface CliCommand {
    execute(): Promise<void>;
}