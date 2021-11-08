module.exports = {
  debug: (msg) => {},
  info: (msg) => console.log(msg),
  success: (msg) => console.log('\x1b[32m%s\x1b[0m', msg),
  error: (msg) => console.log('\x1b[31m%s\x1b[0m', msg),
  line: () => console.log(),
};
