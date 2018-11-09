#!/usr/bin/env node
import { TestRunner } from './lib/testRunner';
import { TestsLoader } from './lib/utils/testsLoader';
import { Config } from './lib/interfaces/config';

import { test } from './lib/decorators/test.decorator';
import { testSuite } from './lib/decorators/testSuite.decorator';
import { expect } from './lib/assertion/expect';
import { TestCase } from './lib/testCase';

export { test, testSuite, expect, TestCase };

const testsLoader = new TestsLoader();
const testRunner = TestRunner.testRunner;

async function run() {
    const config: Config = await import(`${process.cwd()}\\testy.json`);
    await testsLoader.loadTests(config.include);
    await testRunner.runTests();
}

run();