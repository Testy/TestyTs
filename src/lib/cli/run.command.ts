import { existsSync } from 'fs';
import { resolve } from 'path';
import { TestResult } from '../../testyCore';
import { TestyConfig } from '../interfaces/config';
import { Logger } from '../logger/logger';
import { TestRunner } from '../testRunner';
import { TestsLoader } from '../utils/testsLoader';
import { CliCommand } from './cliCommand';
import { testSuite } from '../decorators/testSuite.decorator';
import { TestsRunnerVisitor } from '../tests/visitors/runnerVisitor';

export class RunCommand implements CliCommand {
    public get testyConfigFile(): string { return this._testyConfigFile; }
    public get tsConfigFile(): string { return this._tsConfigFile; }

    constructor(private logger: Logger, private _testyConfigFile: string = 'testy.json', private _tsConfigFile = 'tsconfig.json') { }

    public async execute() {
        const testyConfigPath = resolve(process.cwd(), this._testyConfigFile);
        const tsconfigPath = resolve(process.cwd(), this._tsConfigFile);

        if (!existsSync(testyConfigPath))
            throw new Error(`The specified Testy configuration file could not be found: ${testyConfigPath}`);

        if (!existsSync(testyConfigPath))
            throw new Error(`The specified tsconfig configuration file could not be found: ${testyConfigPath}`);


        const testsLoader = new TestsLoader(this.logger);
        const testRunner = new TestRunner(this.logger);

        const config: TestyConfig = await import(testyConfigPath);
        const tsconfig = await import(tsconfigPath);
        const testSuites = await testsLoader.loadTests(process.cwd(), config.include, tsconfig);
        const runnerVisitor = new TestsRunnerVisitor(this.logger);
        const report = await testSuites.accept(runnerVisitor);
        // const report = await testRunner.runTests(testSuites);
        // report.printStatistics();
        // if (report.result === TestResult.Failure)
        //     throw new Error();
    }
}