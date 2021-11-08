const { join } = require('path');
const { exit } = require('process');
const { existsSync, readFileSync } = require('fs');
const { getDirectories, installTesty, run, linkTesty, unlinkTesty } = require('./utils');
const log = require('./log');
const expect = require('./expect');

const dirsFromArgv = process.argv
  .filter((x) => x.startsWith('test='))
  .map((x) => x.split('test=')[1])
  .map((x) => (x[0] == '"' ? x.slice(1, x.length - 1) : x));

const e2eTests = dirsFromArgv.length > 0 ? dirsFromArgv : getDirectories(__dirname);
const results = [];

try {
  linkTesty();

  for (const test of e2eTests) {
    let testName = test.replace(__dirname, '');
    if (testName.startsWith('\\')) testName = testName.slice(1, testName.length);

    log.line();
    log.info(`------- Running ${testName} -------`);

    installTesty(test);

    const runnerCommandPath = join(test, '.runner_command');
    if (!existsSync(runnerCommandPath)) {
      console.error('E2E tests must have a .runner_command file.');
      results.push({ name: test, success: false });
      continue;
    }
    const command = readFileSync(runnerCommandPath).toString();

    const expectedStdoutPath = join(test, '.expected_stdout');
    const expectedStdout = existsSync(expectedStdoutPath) ? readFileSync(expectedStdoutPath).toString() : null;
    const expectedStderrPath = join(test, '.expected_stderr');
    const expectedStderr = existsSync(expectedStderrPath) ? readFileSync(expectedStderrPath).toString() : null;

    if (expectedStdout == null && expectedStderr == null)
      throw new Error('E2E tests must have at least a .expected_stdout file or a .expected_stderr file.');

    try {
      const output = run(command, test).toString();
      log.info(output);

      if (expect(output).toEqual(expectedStdout)) {
        log.success(`\n✓ Test "${testName}" passed`);
        results.push({ name: testName, success: true });
      } else {
        log.error(`\n× Test "${testName}" failed (output did not match expected output)`);
        results.push({ name: testName, success: false });
      }
    } catch (err) {
      if (err && (err.stdout || err.stderr)) {
        if (err.stdout) log.info(err.stdout.toString());
        if (err.stderr) log.error(err.stderr.toString());

        if (
          (expectedStdout == null || expect(err.stdout).toEqual(expectedStdout)) &&
          (expectedStderr == null || expect(err.stderr).toEqual(expectedStderr))
        ) {
          log.success(`\n✓ Test "${testName}" passed`);
          results.push({ name: testName, success: true });
        } else {
          log.error(
            `\n× Test "${testName}" failed (an unexpected error occured, or error output did not match expected error)`
          );
          results.push({ name: testName, success: false });
        }
      } else {
        log.error(err);
        log.error(`\n× Test "${testName}" failed (an unknown error occured)`);
        results.push({ name: testName, success: false });
      }
    }
  }
} catch (err) {
  log.error(err);
} finally {
  unlinkTesty();
}

log.info('\n--------------------------------\n');
log.info('E2E test run done.');
log.line();

const numberOfSuccess = results.reduce((prev, curr) => prev + (curr.success ? 1 : 0), 0);
const numberOfTests = results.length;

for (const test of results) {
  if (test.success) {
    log.success(` ✓ ${test.name}`);
  } else {
    log.error(` × ${test.name}`);
  }
}

log.line();

log.info(`${numberOfSuccess}/${e2eTests.length} Passed`);
exit(numberOfSuccess === numberOfTests ? 0 : 1);
