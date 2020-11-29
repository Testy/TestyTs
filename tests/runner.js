const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const { execSync } = require("child_process");
const { exit } = require('process');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const integrationTests = getDirectories('.');

const unlinkTesty = () => execSync('npm unlink', { cwd: '../' });
const linkTesty = () => execSync('npm link', { cwd: '../' });
const installTesty = (test) => execSync('npm link testyts', { cwd: `./${test}` });
const run = (test) => execSync('npm test', { cwd: `./${test}` });

const log = {
  info: (msg) => console.log(msg),
  success: (msg) => console.log('\x1b[32m%s\x1b[0m', msg),
  error: (msg) => console.log('\x1b[31m%s\x1b[0m', msg),
  line: () => console.log()
}

let failedTests = 0;

try {
  log.info('Linking TestyTs.')
  unlinkTesty();
  linkTesty();

  for (const test of integrationTests) {
    log.line();
    log.info(`---`);
    log.info(`Running ${test}`);
    log.line();
    
    installTesty(test);

    try {
      run(test);
      log.success('✓ Test passed')
    } catch (err) {
      log.error(err.stdout)
      log.error(err.stderr)
      log.error('× Test failed')
      failedTests++;
    }
  }

} catch (err) {
  log.error(err);
} finally {
  log.line();
  log.info('Unlinking TestyTs')
  unlinkTesty();
}

log.line();

if (failedTests > 0) {
  log.error(`× ${integrationTests.length - failedTests}/${integrationTests.length} Passed`);
  exit(1);
} else {
  log.success(`✓ ${integrationTests.length - failedTests}/${integrationTests.length} Passed`);
  exit(0);
}