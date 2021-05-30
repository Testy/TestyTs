# Changes

## Unreleased

### Fixes

- Fixed issue stack overflow issue with comparing objects _(#77, thanks for reporting, @Pointotech!)_

### Miscellaneous

- Moved [https://github.com/Testy/testyts-assertion](testyts-assertion) lib into this repository.

## 1.3.0

### Features

- Added support for specifying [a setup file](https://github.com/Testy/TestyTs#setup-and-teardown) that is executed before all the tests run. _(tentatively fixes #49, thanks for reporting, @BorderCloud!)_

## 1.2.0

### Fixes

- Added support for [path mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping) module resolution using [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) _(#61, thanks for reporting, @A-ZC-Lau!)_

## 1.1.2

- Fixed issue that caused test runs to run until timeout is completed _(#63, thanks for reporting, @gbreeze!)_

## 1.1.1

### Fixes

- Fixed `NaN` being displayed as `null` in test reports _(#62, thanks for reporting, @Deskbot)_

## 1.1.0

### Features

- Added [global timeout](./readme.md#configuration-file) config _(#57, thanks for the suggestion, @gbreeze!)_
- Added [reporter](./readme.md#configuration-file) config

### Fixes

- Fixed error in number of failed tests in standard output _(#59, thanks for reporting, @gbreeze!)_

## 1.0.3

### Misc.

- Actually reduced package size by 30% by removing unnecessary files

## 1.0.2

### Misc.

- Reduced package size by 30% by removing unnecessary files

## 1.0.1

### Misc.

- Changed the version number to 1.0.1 because it seems like the library was initially published with the version number 1.0.0, so this version number can't be reused. RIP

## 1.0.0 🎊

Seems like the library is stable enough, let's make this one the first major version!

### Fixes

- Testy will exit with code 1 if there is a compilation error (thanks for contributing, @mastodon0!)
- Comments are now supported in tsconfig (thanks for reporting, @gbreeze!)

## 0.9.0

### Fixes

- A failed test run will yield non-zero exit code

## 0.8.2

### Features

- Added support for specifying a tsconfig.json file in the testy.json configuration file (`"tsconfig": "your/tsconfig.json"`)

## 0.8.1

### Features

- Added a tsconfig option to the CLI (-t/--tsconfig <path>)

## 0.8.0

- Implemented `@Timeout` decorator
- Implemented the `@TestCase` decorator
- Removed the `timeout` argument from the `@Test` decorator
- Removed the `testCases` argument from the `@Test` decorator
- Implemented a TAP reporter
- Added a reporter option to the CLI (-r/--reporter)

## 0.7.6

- Reduced package size

## 0.7.5

- Moved missing dependency

## 0.7.4

- Exported `expect` from `@testy/assertion`

## 0.7.3

- Added a bunch of stuff to .npmignore

## 0.7.2

- Fixed the missing error messages bug (#19)
- Improved console logging

## 0.7.1

- Fixed missing exports

## 0.7.0

- Renamed all decorators so they begin with capital letters, to match other big packages conventions

## 0.6.0

- Is actually 0.5.1 republished under 0.6.0 because of some breaking changes.

## 0.5.3

- Is really just 0.5.0. It was released because 0.5.1 actually had a breaking change.

## 0.5.2

- Does not exist.

## 0.5.1

- Refactored a few methods to improve the maintainability
- Fixed the base class bug

## 0.5.0

- Implemented a decorator pattern to decouple the test runner and the test reporting
- Refactored the test collection to decouple the tests data structure and the test running

## 0.4.3

- Fixed focused tests bug
- Made the name parameter optional for `ftest` and `xtest` too

## 0.4.2

- Added tests for focused tests

## 0.4.1

- Made the name parameter optional for `@test` and `@testSuite` decorators

## 0.4.0

- Refactored the test suite

## 0.3.1

- Refactored the test runner and test loader to reduce coupling
- Created debug config for vscode

## 0.3.0

- Added more info in README.md

## 0.2.0

- Fixed some grammar mistakes in the README.md
- Added this CHANGES.md file

## 0.1.0

- Initial version
