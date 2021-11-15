module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['../../.eslintrc.js', 'prettier'],
  plugins: ['eslint-plugin-jsdoc', '@typescript-eslint', '@typescript-eslint/tslint'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
