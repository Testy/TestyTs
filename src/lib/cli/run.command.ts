import { CliCommand } from './cliCommand';
import { writeFile, fstat, existsSync } from 'fs';
import { resolve } from 'path';
import { Config } from '../interfaces/config';
import { Logger } from '../logger/logger';
import { TestsLoader } from '../utils/testsLoader';
import { TestRunner } from '../testRunner';
import { TestResult } from '../../testy';

export class RunCommand implements CliCommand {

    private readonly defaultConfig: Config = {
        include: ['**/*.spec.ts']
    };

    constructor(private logger: Logger, private configFile: string = 'testy.json') { }

    public async execute() {
        const configPath = resolve(process.cwd(), this.configFile);
        if (!existsSync(configPath))
            throw new Error(`The specified configuration file could not be found: ${configPath}`);

        const testsLoader = new TestsLoader();
        const testRunner = TestRunner.testRunner;

        const config: Config = await import(configPath);
        await testsLoader.loadTests(config.include);
        const report = await testRunner.runTests(this.logger);
        report.printStatistics();
        if (report.result === TestResult.Failure)
            throw new Error();
    }
}