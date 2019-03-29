import { TestSuite } from '../../../../lib/decorators/testSuite.decorator';
import { BeforeEach } from '../../../../lib/decorators/afterAndBefore.decorator';
import { TestRunnerVisitor } from '../../../../lib/tests/visitors/testRunnerVisitor';
import { TestVisitor } from '../../../../lib/tests/visitors/testVisitor';
import { Report } from '../../../../lib/reporting/report/report';
import { StringLogger } from '../../../utils/stringLogger';
import { TapTestReporterDecorator } from '../../../../lib/tests/visitors/decorators/tapTestReporterDecorator';
import { Test } from '../../../../lib/decorators/test.decorator';
import { TestUtils } from '../../../utils/testUtils';
import { DummyTapDecoratorTestSuite, dummyTapDecoratorTestSuiteExpectedOutput } from './dummyTapDecoratorTestSuite';
import { expect } from '@testy/assertion';

@TestSuite('Tap Reporter Tests')
export class TapTestReporterDecoratorTests {
    private testRunnerVisitor: TestVisitor<Report>;
    private logger: StringLogger;

    @BeforeEach()
    beforeEach() {
        this.logger = new StringLogger();
        this.testRunnerVisitor = new TestRunnerVisitor();
        this.testRunnerVisitor = new TapTestReporterDecorator(this.testRunnerVisitor, this.logger);
    }

    @Test('Test suite output respects the TAP spec')
    async outputRespectsSpec() {
        // Arrange
        const testSuite = TestUtils.getInstance(DummyTapDecoratorTestSuite);

        // Act
        await testSuite.accept(this.testRunnerVisitor);

        // Assert
        // We split each line and remove the comments and empty lines
        const output = this.logger.string
            .split('\n')
            .filter(x => !x.trim().startsWith('#') && x.length > 0);

        expect.arraysToBeEqual(output, dummyTapDecoratorTestSuiteExpectedOutput);
    }
}