const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const { execSync } = require("child_process");
const { exit } = require('process');
const { existsSync, readFileSync } = require('fs');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const integrationTests = getDirectories(__dirname);

const installTesty = (test) => execSync('npm link testyts', { cwd: test });
const run = (command, test) => execSync(command, { cwd: join(test) });
const sanitize = (output) => output.toString().replace(/^> .*/gm, '').replace(/\s/g, '');

const unlinkTesty = () => {
  log.debug('Unlinking TestyTs')
  execSync('npm unlink', { cwd: join(__dirname, '/../') });
}

const linkTesty = () => {
  unlinkTesty();

  log.debug('Linking TestyTs.')
  execSync('npm link', { cwd: join(__dirname, '/../') });
}

const log = {
  debug: (msg) => { },
  info: (msg) => console.log(msg),
  success: (msg) => console.log('\x1b[32m%s\x1b[0m', msg),
  error: (msg) => console.log('\x1b[31m%s\x1b[0m', msg),
  line: () => console.log()
}

const results = [];

try {
  linkTesty();

  for (const test of integrationTests) {
    let testName = test.replace(__dirname, '');
    if(testName.startsWith('\\')) testName = testName.slice(1, testName.length);

    log.line();
    log.info(`------- Running ${testName} -------`);

    installTesty(test);

    const runnerCommandPath = join(test, '.runner_command');
    if (!existsSync(runnerCommandPath)) {
      console.error('Integration tests must have a .runner_command file.');
      results.push({ name: test, success: false });
      continue;
    }
    const command = readFileSync(runnerCommandPath).toString();

    const expectedStdoutPath = join(test, '.expected_stdout');
    const expectedStdout = existsSync(expectedStdoutPath) ? readFileSync(expectedStdoutPath).toString() : null;
    const expectedStderrPath = join(test, '.expected_stderr');
    const expectedStderr = existsSync(expectedStderrPath) ? readFileSync(expectedStderrPath).toString() : null;

    if (expectedStdout == null && expectedStderr == null) throw new Error('Integration tests must have at least a .expected_stdout file or a .expected_stderr file.')

    try {
      const output = run(command, test).toString();
      log.info(output);

      if (sanitize(expectedStdout) === sanitize(output)) {
        log.success(`\n✓ Test "${testName}" passed`)
        results.push({ name: testName, success: true });
      } else {
        log.error(`\n× Test "${testName}" failed (output did not match expected output)`)
        results.push({ name: testName, success: false });
      }

    } catch (err) {

      if (err && (err.stdout || err.stderr)) {

        if (err.stdout) log.info(err.stdout.toString());
        if (err.stderr) log.error(err.stderr.toString());

        if ((expectedStdout == null || sanitize(expectedStdout) === sanitize(err.stdout))
          && (expectedStderr == null || sanitize(expectedStderr) === sanitize(err.stderr))) {
          log.success(`\n✓ Test "${testName}" passed`)
          results.push({ name: testName, success: true });
        } else {
          log.error(`\n× Test "${testName}" failed (an unexpected error occured, or error output did not match expected error)`)
          results.push({ name: testName, success: false });
        }
      } else {
        log.error(err);
        log.error(`\n× Test "${testName}" failed (an unknown error occured)`)
        results.push({ name: testName, success: false });
      }
    }
  }

} catch (err) {
  log.error(err);
} finally {
  unlinkTesty();
}

log.info('\n--------------------------------\n')
log.info('Integration test run done.')
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

log.info(`${numberOfSuccess}/${integrationTests.length} Passed`);
exit(numberOfSuccess === numberOfTests ? 0 : 1);