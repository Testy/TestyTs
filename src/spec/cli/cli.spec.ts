import { TestSuite, BeforeEach, Test, TestCaseInstance, FTest } from '../../testyCore';
import { Logger } from '../../lib/logger/logger';
import { TestyCli } from '../../lib/cli/testyCli';
import { NullLogger } from '../utils/nullLogger';
import { RunCommand } from '../../lib/cli/run.command';
import { InitCommand } from '../../lib/cli/init.command';
import { expect } from '@testy/assertion';
import { TestCase } from '../../lib/decorators/testCase.decorator';
import { TestVisitorFactory } from '../../lib/tests/visitors/testVisitor.factory';
import * as program from 'commander';
import { AfterEach } from '../../lib/decorators/afterAndBefore.decorator';

@TestSuite('Cli Tests')
export class CliTests {

    private logger: Logger;
    private testVisitorFactory: TestVisitorFactory;
    private cli: TestyCli;

    @BeforeEach()
    private beforeEach() {
        this.logger = new NullLogger();
        this.testVisitorFactory = new TestVisitorFactory(this.logger);

        this.cli = new TestyCli(this.logger, this.testVisitorFactory);
    }

    @AfterEach()
    private afterEach() {
        // Prevents a potential memory leak: https://github.com/tj/commander.js/issues/581
        program.removeAllListeners();
    }

    @Test('Run command')
    @TestCase('testy', ['node', '/some/path'], './testy.json')
    @TestCase('testy --tsconfig some/tsconfig.json', ['node', '/some/path', '--tsconfig', 'some/tsconfig.json'], './testy.json', 'some/tsconfig.json')
    @TestCase('testy -c alternate/config.json', ['node', '/some/path', '-c', 'alternate/config.json'], 'alternate/config.json')
    @TestCase('testy --config alternate/config.json', ['node', '/some/path', '--config', 'alternate/config.json'], 'alternate/config.json')
    @TestCase('testy -r TAP', ['node', '/some/path', '-r', 'TAP'], './testy.json')
    @TestCase('testy --reporter TAP', ['node', '/some/path', '--reporter', 'TAP'], './testy.json')
    @TestCase('testy -r standard', ['node', '/some/path', '-r', 'standard'], './testy.json')
    @TestCase('testy --reporter standard', ['node', '/some/path', '--reporter', 'standard'], './testy.json')
    @TestCase('testy -c some/testy.json -t some/path/tsconfig.json', ['node', '--config', 'some/testy.json', '-t', 'some/path/tsconfig.json'], 'some/testy.json', 'some/path/tsconfig.json')
    @TestCase('testy -r TAP --config alternate/config.json', ['node', '/some/path', '-r', 'TAP', '--config', 'alternate/config.json'], 'alternate/config.json')
    @TestCase('testy --reporter TAP --config alternate/config.json', ['node', '/some/path', '--reporter', 'TAP', '--config', 'alternate/config.json'], 'alternate/config.json')
    @TestCase('testy --config alternate/config.json -r TAP', ['node', '/some/path', '--config', 'alternate/config.json', '-r', 'TAP'], 'alternate/config.json')
    @TestCase('testy --config alternate/config.json --reporter TAP', ['node', '/some/path', '--config', 'alternate/config.json', '--reporter', 'TAP'], 'alternate/config.json')
    @TestCase('testy -r standard --config alternate/config.json', ['node', '/some/path', '-r', 'standard', '--config', 'alternate/config.json'], 'alternate/config.json')
    @TestCase('testy --reporter standard --config alternate/config.json', ['node', '/some/path', '--reporter', 'standard', '--config', 'alternate/config.json'], 'alternate/config.json')
    @TestCase('testy --config alternate/config.json -r standard', ['node', '/some/path', '--config', 'alternate/config.json', '-r', 'standard'], 'alternate/config.json')
    @TestCase('testy --config alternate/config.json --reporter standard', ['node', '/some/path', '--config', 'alternate/config.json', '--reporter', 'standard'], 'alternate/config.json')
    private async runCommandTests(args: any[], expectedConfig: string, expectedTsConfig: string = undefined) {
        // Act
        const command = await this.cli.getCommand(args);

        // Assert
        expect.toBeTrue(command instanceof RunCommand);
        const runCommand = command as RunCommand;
        expect.toBeEqual(runCommand.testyConfigFile, expectedConfig);
        expect.toBeEqual(runCommand.tsConfigFile, expectedTsConfig);
    }

    @Test('testy init')
    private async initCommandTests() {
        // Arrange
        const args = ['node', '/some/path', 'init'];

        // Act
        const command = await this.cli.getCommand(args);

        // Assert
        expect.toBeTrue(command instanceof InitCommand);
    }

    @Test('invalid reporter, should default to standard')
    private async invalidReporter() {
        // Act
        const args = ['node', '/some/path', '-r', 'invalidReporter'];
        const command = await this.cli.getCommand(args);

        // Assert
        expect.toBeTrue(command instanceof RunCommand);
        const runCommand = command as RunCommand;
        expect.toBeEqual(runCommand.testyConfigFile, './testy.json');
    }
}