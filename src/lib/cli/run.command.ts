import { existsSync } from 'fs';
import { resolve } from 'path';
import { TestResult } from '../../testyCore';
import { TestyConfig } from '../interfaces/config';
import { Logger } from '../logger/logger';
import { TestRunner } from '../testRunner';
import { TestsLoader } from '../utils/testsLoader';
import { CliCommand } from './cliCommand';

export class RunCommand implements CliCommand {
    public get configFile(): string { return this._configFile; }

    private readonly defaultConfig: TestyConfig = {
        include: ['**/*.spec.ts']
    };

    constructor(private logger: Logger, private _configFile: string = 'testy.json', private _tsConfigFile = 'tsconfig.json') { }

    public async execute() {
        const configPath = resolve(process.cwd(), this._configFile);
        const tsconfigPath = resolve(process.cwd(), this._tsConfigFile);
        if (!existsSync(configPath))
            throw new Error(`The specified configuration file could not be found: ${configPath}`);

        const testsLoader = new TestsLoader(this.logger);
        const testRunner = new TestRunner(this.logger);

        const config: TestyConfig = await import(configPath);
        const tsconfig = require('../tsconfig.json');
        const testSuites = await testsLoader.loadTests(process.cwd(), config.include, tsconfig);
        const report = await testRunner.runTests(testSuites);
        report.printStatistics();
        if (report.result === TestResult.Failure)
            throw new Error();
    }
}