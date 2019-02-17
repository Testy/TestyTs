# Changes

### 0.8.0
  - Implemented `@Timeout` decorator
  - Implemented the `@TestCase` decorator
  - Removed the `timeout` argument from the `@Test` decorator
  - Removed the `testCases` argument from the `@Test` decorator

### 0.7.6
  - Reduced package size

### 0.7.5
  - Moved missing dependency

### 0.7.4
  - Exported `expect` from `@testy/assertion`

### 0.7.3
  - Added a bunch of stuff to .npmignore

### 0.7.2
  - Fixed the missing error messages bug (#19)
  - Improved console logging

### 0.7.1
  - Fixed missing exports

### 0.7.0
 - Renamed all decorators so they begin with capital letters, to match other big packages conventions

### 0.6.0
 - Is actually 0.5.1 republished under 0.6.0 because of some breaking changes.

### 0.5.3
 - Is really just 0.5.0. It was released because 0.5.1 actually had a breaking change.

### 0.5.2
- Does not exist.

### 0.5.1
 - Refactored a few methods to improve the maintainability
 - Fixed the base class bug

### 0.5.0
 - Implemented a decorator pattern to decouple the test runner and the test reporting
 - Refactored the test collection to decouple the tests data structure and the test running

### 0.4.3
 - Fixed focused tests bug
 - Made the name parameter optional for `ftest` and `xtest` too

### 0.4.2
 - Added tests for focused tests

### 0.4.1
 - Made the name parameter optional for `@test` and `@testSuite` decorators

### 0.4.0
 - Refactored the test suite

### 0.3.1
 - Refactored the test runner and test loader to reduce coupling
 - Created debug config for vscode

### 0.3.0
 - Added more info in README.md

### 0.2.0
- Fixed some grammar mistakes in the README.md
- Added this CHANGES.md file

### 0.1.0 
- Initial version
