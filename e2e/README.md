# E2E tests

An e2e test is simply a TypeScript project that uses Testy.Ts. The runner goes through each sub-folder and runs "npm test -- -r TAP". 

Some tests are expected to end with success, some with failure.

**If the test run ends with success**, the runner will compare the test process's STDOUT to the `.expected_stdout` file. When comparing, the runner sanitizes both strings by removing whitespaces as well as lines starting with "`> `" (we don't really care about those, they usually are CLI stuff). 

**If the test results in a failure**, then the runner compares the process's STDOUT with the `.expected_stdout`, if any, and the process's STDERR with the `.expected_stderr`, if any. Before comparing, the runner will also sanitize the strings on both sides of each comparison.

Upon initialization, the runner links the locally built version of Testy.Ts (`npm link`). Then, before running each test, it links Testy.Ts in the test subfolder (`npm link testyts`). 

N.B.: `#` characters in the `.expected_stdout` and `.expeted_stderr` files act as a wildcard. For example, if the expected output is `2/4 tests passed (######)` and the actual output is `2/4 tests passed (0.002s)`, the test will pass.

## Running tests

Clone the repo..

```sh
git clone https://github.com/Testy/TestyTs.git
```

Install dependencies and build.

```sh
npm ci
npm run build # or "npm run build:prod"
```

Execute the tests.

```sh
node .\tests\runner.js
```

N.B: The runner will unlink testyts at the end of a test run, so any previously linked folder named "testyts" will be unlinked.