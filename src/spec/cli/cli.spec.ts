import { TestSuite, BeforeEach, Test, TestCase, expect } from '../../testyCore';
import { Logger } from '../../lib/logger/logger';
import { TestyCli } from '../../lib/cli/testyCli';
import { NullLogger } from '../utils/nullLogger';
import { RunCommand } from '../../lib/cli/run.command';
import { InitCommand } from '../../lib/cli/init.command';

@TestSuite('Cli Tests')
export class CliTests {

    private logger: Logger;
    private cli: TestyCli;

    @BeforeEach()
    private beforeEach() {
        this.logger = new NullLogger();
        this.cli = new TestyCli(this.logger);
    }

    @Test('Run command', [
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
        expect.toBeEqual(runCommand.testyConfigFile, expectedConfig);
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
}