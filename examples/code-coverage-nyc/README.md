# Code coverage with NYC

TestyTs does not currently have built-in code coverage. It is however possible to measure code coverage using NYC.

## Use the example project

Simply install the dependencies using `npm install`, and then run `npm run test:coverage`. The coverage report should be available both in the console and in the `coverage` folder.

## How to use NYC in your own project

**N.B.: Your project must be configured to produce source maps.**

First, install the dependencies

```
npm i -D nyc source-map-support ts-node @istanbuljs/nyc-config-typescript
```

Then, create a `.nycrc` file that looks like this:

```js
{
  "extends": "@istanbuljs/nyc-config-typescript",
  "all": true, // OPTIONAL if you want coverage reported on every file, including those that aren't tested:
  "reporter": ["html", "text"],
  "exclude": ["**/*.js", "**/*.spec.ts"]
}
```

Finally, add a script for running nyc against TestyTs.

```js
    "test:coverage": "nyc npm run test"
```
