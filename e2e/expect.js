const log = require('./log');

function sanitize(output) {
  return output.toString()
    .replace(/^> .*/gm, '')
    .replace(/\s/g, '')
    .replace(/\x1b\[[0-9]{1,2}m/g, '');
}

function slice(str, center, width = 20) {
  const half = Math.ceil(width / 2);
  let min = center - half;
  let max = center + half;
  let len = str.length;
  
  if(min < 0) {
    max += Math.abs(min);
  }

  if(max > len) {
    min -= max - len;
  }

  return str.slice(Math.max(min, 0), Math.min(max, len - 1))
}

function expect(actual) {
  return {
    toEqual: (expected) => {
      actual = sanitize(actual);
      expected = sanitize(expected);

      let isValid = true;
      for (let i = 0; i < actual.length; ++i) {
        if (expected[i] !== '#' && actual[i] !== expected[i]) {



          log.error(`Expected string did not match: ${slice(actual, i)} != ${slice(expected, i)}`)
          isValid = false;
          break;
        }
      }

      return isValid;
    }
  }
}




module.exports = expect;