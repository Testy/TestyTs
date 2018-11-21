#!/usr/bin/env ts-node

import { LoggerFactory } from './lib/logger/loggerFactory';
import { TestyCli } from './lib/cli/testyCli';

export { test, ftest, xtest } from './lib/decorators/test.decorator';
export { testSuite, ftestSuite, xtestSuite } from './lib/decorators/testSuite.decorator';
export { expect } from './lib/assertion/expect';
export { TestCase } from './lib/testCase';
export { afterAll } from './lib/decorators/afterAll.decorator';
export { afterEach } from './lib/decorators/afterEach.decorator';
export { beforeEach } from './lib/decorators/beforeEach.decorator';
export { beforeAll } from './lib/decorators/beforeAll.decorator';
export { TestResult } from './lib/reporting/report/testResult';

export function main(args: any[]) {
    const logger = LoggerFactory.create();
    const cli = new TestyCli(logger);
    cli.handle(process.argv);
}

