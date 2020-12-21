import { expect } from '@testy/assertion';
import * as program from 'commander';
import { IMock, It, Mock, Times } from 'typemoq';
import { InitCommand } from '../../lib/cli/init.command';
import { RunCommand } from '../../lib/cli/run.command';
import { TestyCli } from '../../lib/cli/testyCli';
import { AfterEach } from '../../lib/decorators/afterAndBefore.decorator';
import { TestCase } from '../../lib/decorators/testCase.decorator';
import { Logger } from '../../lib/logger/logger';
import { Report } from '../../lib/reporting/report/report';
import { TestSuiteInstance } from '../../lib/tests/testSuite';
import { TestVisitor } from '../../lib/tests/visitors/testVisitor';
import { TestVisitorFactory } from '../../lib/tests/visitors/testVisitor.factory';
import { JsonLoader } from '../../lib/utils/jsonLoader.service';
import { TestsLoader } from '../../lib/utils/testsLoader';
import { BeforeEach, FTest, Test, TestSuite } from '../../testyCore';
import { NullLogger } from '../utils/nullLogger';

@TestSuite('Cli Tests')
export class CliTests {

    private logger: Logger;
    private testVisitorFactoryMock: IMock<TestVisitorFactory>;
    private testVisitorMock: IMock<TestVisitor<Report>>;
    private testLoaderMock: IMock<TestsLoader>;
    private cli: TestyCli;
    private jsonLoaderMock: IMock<JsonLoader>;

    @BeforeEach()
    private beforeEach() {
        this.logger = new NullLogger();

        this.testVisitorMock = Mock.ofType<TestVisitor<Report>>();
        this.testVisitorFactoryMock = Mock.ofType<TestVisitorFactory>();
        this.testVisitorFactoryMock.setup(x => x.getRunner(It.isAny())).returns(() => this.testVisitorMock.object);

        this.testLoaderMock = Mock.ofType<TestsLoader>();
        this.testLoaderMock.setup(x => x.loadTests(It.isAny(), It.isAny(), It.isAny())).returns(() => Promise.resolve(null));

        this.jsonLoaderMock = Mock.ofType<JsonLoader>();
        this.jsonLoaderMock.setup(x => x.load(It.isAny())).returns(() => Promise.resolve({}));
        this.cli = new TestyCli(this.logger, this.testVisitorFactoryMock.object, this.jsonLoaderMock.object, this.testLoaderMock.object);
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
    private async runCommandTests(args: any[], expectedConfig: string, expectedTsConfig?: string) {
        // Act
        const command = await this.cli.getCommand(args);
        await command.execute();

        // Assert
        expect.toBeTrue(command instanceof RunCommand);

        this.jsonLoaderMock.verify(x => x.load(It.isValue(expectedConfig)), Times.once());
        this.jsonLoaderMock.verify(x => x.load(It.isValue(expectedTsConfig || 'tsconfig.json')), Times.once());
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