const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const { execSync } = require("child_process");
const { exit } = require('process');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const integrationTests = getDirectories('.');

const installTesty = (test) => execSync('npm link testyts', { cwd: `./${test}` });
const run = (test) => execSync('npm test', { cwd: `./${test}`, stdio: 'inherit' });

const unlinkTesty = () => {
  log.debug('Unlinking TestyTs')
  execSync('npm unlink', { cwd: '../' });
}

const linkTesty = () => {
  unlinkTesty();

  log.debug('Linking TestyTs.')
  execSync('npm link', { cwd: '../' });
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
    log.line();
    log.info(`------- Running ${test} -------`);

    installTesty(test);

    try {
      run(test);
      log.success(`\n✓ Test "${test}" passed`)
      results.push({ name: test, success: true });
    } catch (err) {
      log.error(err.stdout)
      log.error(err.stderr)
      log.error(`\n× Test "${test}" failed`)
      results.push({ name: test, success: false });
    }
  }

} catch (err) {
  log.error(err);
} finally {
  log.line();
  unlinkTesty();
}

log.info('--------------------------------')
log.info('Integration test run done.')
log.line();

const numberOfSuccess = results.reduce((prev, curr) => prev + curr.success ? 1 : 0, 0);
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