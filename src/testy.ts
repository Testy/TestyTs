#!/usr/bin/env node
import { TestRunner } from './lib/testRunner';
import { TestsLoader } from './lib/utils/testsLoader';
import { Config } from './lib/interfaces/config';

const testsLoader = new TestsLoader();
const testRunner = TestRunner.testRunner;

async function run() {
    const config: Config = await import(`${process.cwd()}\\testy.json`);
    await testsLoader.loadTests(config.include);
    await testRunner.runTests();
}

run();