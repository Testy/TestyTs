#!/usr/bin/env node
import { TestRunner } from './lib/testRunner';
import { TestsLoader } from './lib/utils/testsLoader';
import { Config } from './lib/interfaces/config';

import { test, ftest, xtest } from './lib/decorators/test.decorator';
import { testSuite, ftestSuite, xtestSuite } from './lib/decorators/testSuite.decorator';
import { expect } from './lib/assertion/expect';
import { TestCase } from './lib/testCase';
import { ConsoleLogger } from './lib/logger/consoleLogger';
import { afterAll } from './lib/decorators/afterAll.decorator';
import { afterEach } from './lib/decorators/afterEach.decorator';
import { beforeEach } from './lib/decorators/beforeEach.decorator';
import { beforeAll } from './lib/decorators/beforeAll.decorator';
import { TestResult } from './lib/reporting/report/testResult';
import * as path from 'path';
import { Logger } from './lib/logger/logger';

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

async function run(logger: Logger) {
    const config: Config = await import(path.resolve(process.cwd(), 'testy.json'));
    await testsLoader.loadTests(config.include);
    const report = await testRunner.runTests(logger);
    report.printStatistics();
    if (report.result === TestResult.Failure)
        throw new Error();
}

run(logger).catch(err => {
    console.error(err);
    process.exit(1);
});