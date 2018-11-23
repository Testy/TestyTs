import { expect } from '../../lib/assertion/expect';
import { RunCommand } from '../../lib/cli/run.command';
import { TestyCli } from '../../lib/cli/testyCli';
import { beforeEach } from '../../lib/decorators/beforeEach.decorator';
import { test } from '../../lib/decorators/test.decorator';
import { testSuite } from '../../lib/decorators/testSuite.decorator';
import { Logger } from '../../lib/logger/logger';
import { TestCase } from '../../lib/testCase';
import { NullLogger } from '../utils/nullLogger';
import { InitCommand } from '../../lib/cli/init.command';

@testSuite('Cli Tests')
export class CliTests {
    private logger: Logger;
    private cli: TestyCli;

    @beforeEach()
    private beforeEach() {
        this.logger = new NullLogger();
        this.cli = new TestyCli(this.logger);
    }

    @test('Run command', [
        new TestCase('testy', ['node', '/some/path'], 'testy.json'),
        new TestCase('testy -c alternate/config.json', ['node', '/some/path', '-c', 'alternate/config.json'], 'alternate/config.json'),
        new TestCase('testy --config alternate/config.json', ['node', '/some/path', '--config', 'alternate/config.json'], 'alternate/config.json'),
    ])
    private async runCommandTests(args: any[], expectedConfig: string) {
        // Act
        const command = await this.cli.getCommand(args);

        // Assert
        expect.toBeTrue(command instanceof RunCommand);
        const runCommand = command as RunCommand;
        expect.toBeEqual(runCommand.configFile, expectedConfig);
    }

    @test('testy init')
    private async initCommandTests() {
        // Arrange
        const args = ['node', '/some/path', 'init'];

        // Act
        const command = await this.cli.getCommand(args);

        // Assert
        expect.toBeTrue(command instanceof InitCommand);
    }
}