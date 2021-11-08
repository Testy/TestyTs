const log = require('./log');

function sanitize(output) {
  return output
    .toString()
    .replace(/^> .*/gm, '')
    .replace(/\s/g, '')
    .replace(/\x1b\[[0-9]{1,2}m/g, '');
}

function slice(str, center, width = 20) {
  const half = Math.ceil(width / 2);
  let min = center - half;
  let max = center + half;
  let len = str.length;

  if (min < 0) {
    max += Math.abs(min);
  }

  if (max > len) {
    min -= max - len;
  }

  return str.slice(Math.max(min, 0), Math.min(max, len - 1));
}

function expect(actualOutput) {
  return {
    toEqual: (expectedOutput) => {
      const expectedLines = expectedOutput
        .toString()
        .split(/\r?\n/)
        .map((x) => sanitize(x))
        .filter((x) => x.match(/^ *$/) === null);

      const actualLines = actualOutput
        .toString()
        .split(/\r?\n/)
        .map((x) => sanitize(x))
        .filter((x) => x.match(/^ *$/) === null);
      let isValid = true;

      for (let i = 0; i < actualLines.length; ++i) {
        let actual = actualLines[i];
        let expected = expectedLines[i];

        if (expected.split('').every((c) => c === '#' || c === ' ')) {
          continue;
        }

        for (let i = 0; i < actual.length; ++i) {
          if (expected[i] !== '#' && actual[i] !== expected[i]) {
            log.error(`Expected string did not match: ${slice(actual, i)} != ${slice(expected, i)}`);
            isValid = false;
            break;
          }
        }
      }
      return isValid;
    },
  };
}

module.exports = expect;
