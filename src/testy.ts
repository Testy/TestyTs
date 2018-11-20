#!/usr/bin/env node
import { TestRunner } from './lib/testRunner';
import { TestsLoader } from './lib/utils/testsLoader';
import { Config } from './lib/interfaces/config';

import { test, ftest, xtest } from './lib/decorators/test.decorator';
import { testSuite, ftestSuite, xtestSuite } from './lib/decorators/testSuite.decorator';
import { expect } from './lib/assertion/expect';
import { TestCase } from './lib/testCase';
import { ConsoleReporter } from './lib/reporting/reporters/consoleReporter';
import { ConsoleLogger } from './lib/logger/consoleLogger';
import { afterAll } from './lib/decorators/afterAll.decorator';
import { afterEach } from './lib/decorators/afterEach.decorator';
import { beforeEach } from './lib/decorators/beforeEach.decorator';
import { beforeAll } from './lib/decorators/beforeAll.decorator';
import { TestResult } from './lib/reporting/report/testResult';
import * as path from 'path';

export {
    test, ftest, xtest,
    testSuite, ftestSuite, xtestSuite,
    beforeAll,
    beforeEach,
    afterEach,
    afterAll,
    expect,
    TestCase
};

const testsLoader = new TestsLoader();
const testRunner = TestRunner.testRunner;
const logger = new ConsoleLogger();
const reporter = new ConsoleReporter(logger);

async function run() {
    const config: Config = await import(path.resolve(process.cwd(), 'testy.json'));
    await testsLoader.loadTests(config.include);
    const report = await testRunner.runTests();
    report.acceptReporter(reporter);

    if (report.result === TestResult.Failure)
        throw new Error();
}

run().catch(err => {
    console.error(err.message);
    process.exit(1);
});