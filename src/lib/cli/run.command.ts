import { existsSync } from 'fs';
import { resolve } from 'path';
import { TestyConfig } from '../interfaces/config';
import { Logger } from '../logger/logger';
import { TestsLoader } from '../utils/testsLoader';
import { CliCommand } from './cliCommand';
import { TestVisitor } from '../tests/visitors/testVisitor';
import { Report } from '../reporting/report/report';
import { TestRunnerVisitor } from '../tests/visitors/testRunnerVisitor';
import { LoggerTestReporterDecorator } from '../tests/visitors/decorators/loggerTestReporterDecorator';

export class RunCommand implements CliCommand {
    public get testyConfigFile(): string { return this._testyConfigFile; }
    public get tsConfigFile(): string { return this._tsConfigFile; }

    constructor(private logger: Logger, private _testyConfigFile: string = 'testy.json', private _tsConfigFile = 'tsconfig.json') { }

    public async execute() {
        const testyConfig = await this.loadTestyConfig();
        const tsConfig = await this.loadTsConfig();

        const testsLoader = new TestsLoader(this.logger);
        const testSuites = await testsLoader.loadTests(process.cwd(), testyConfig.include, tsConfig);

        let testRunnerVisitor: TestVisitor<Report> = new TestRunnerVisitor();
        testRunnerVisitor = new LoggerTestReporterDecorator(testRunnerVisitor, this.logger);
        await testSuites.accept(testRunnerVisitor);
    }

    private async loadTestyConfig(): Promise<TestyConfig> {
        const testyConfigPath = resolve(process.cwd(), this._testyConfigFile);
        if (!existsSync(testyConfigPath))
            throw new Error(`The specified Testy configuration file could not be found: ${testyConfigPath}`);
        return await import(testyConfigPath);
    }

    private async loadTsConfig(): Promise<{}> {
        const tsconfigPath = resolve(process.cwd(), this._tsConfigFile);
        if (!existsSync(tsconfigPath))
            throw new Error(`The specified tsconfig configuration file could not be found: ${tsconfigPath}`);

        return await import(tsconfigPath);
    }
}