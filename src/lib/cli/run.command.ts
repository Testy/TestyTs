import { existsSync } from 'fs';
import { resolve } from 'path';
import { TestyConfig } from '../interfaces/config';
import { Logger } from '../logger/logger';
import { TestsLoader } from '../utils/testsLoader';
import { CliCommand } from './cliCommand';
import { TestVisitor } from '../tests/visitors/testVisitor';
import { Report } from '../reporting/report/report';
import * as tsnode from 'ts-node';

export class RunCommand implements CliCommand {
    public get testyConfigFile(): string { return this._testyConfigFile; }
    public get tsConfigFile(): string { return this._tsConfigFile; }

    constructor(private logger: Logger,
        private testRunnerVisitor: TestVisitor<Report>,
        private _testyConfigFile: string = 'testy.json',
        private _tsConfigFile) {
    }

    public async execute() {
        const testyConfig = await this.loadTestyConfig();
        // We load the tsConfig file. In priority order, we use
        // 1. The tsconfig file specified from the command line
        // 2. The tsconfig file specified in the testy config file
        // 3. The root folder's tsconfig.json file
        let tsConfigPath = this.tsConfigFile;
        if (tsConfigPath == null) {
            tsConfigPath = testyConfig.tsconfig;
        }

        if (tsConfigPath == null) {
            tsConfigPath = 'tsconfig.json';
        }

        const tsConfig = await this.loadTsConfig(tsConfigPath);

        const testsLoader = new TestsLoader(this.logger);
        const testSuites = await testsLoader.loadTests(process.cwd(), testyConfig.include, tsConfig);

        await testSuites.accept(this.testRunnerVisitor);
    }

    private async loadTestyConfig(): Promise<TestyConfig> {
        return await this.loadConfig<TestyConfig>(this._testyConfigFile);
    }

    private async loadTsConfig(tsConfigPath: string): Promise<tsnode.Options> {
        return await this.loadConfig<tsnode.Options>(tsConfigPath);
    }

    private async loadConfig<T>(file: string): Promise<T> {
        const path = resolve(process.cwd(), file);
        if (!existsSync(path))
            throw new Error(`The specified configuration file could not be found: ${path}`);

        return await import(path);
    }
}