# TestyTs
[![Build Status](https://travis-ci.com/Aboisier/TestyTs.svg?token=vuBsBM3yD6PMvt3zwT9s&branch=master)](https://travis-ci.com/Aboisier/TestyTs)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FAboisier%2FTestyTs.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FAboisier%2FTestyTs?ref=badge_shield)


TestyTs is a modern TypeScript testing framework.

## Why?
Writing tests should be fun. The other testing framework solutions do not make use of the full power of TypeScript. This one uses decorators and OOP and stuff. Therefore, it makes writing tests fun.

## Installation

```
$ npm install --save-dev testyts
$ npm install -g testyts
```

## Setup

To generate a testy.json configuration file, use the following cmmand:

```
$ testy init
```


## Write some tests

### The basics 
Writing tests with Testy is simple.

```ts
@testSuite('Sum Test Suite')
class MyTestSuite {

    @test('One plus one, should equal two')
    onePlusOne() {
        // Act
        const result = 1 + 1;
        
        // Assert
        expect.toBeEqual(result, 2);
    }
}
```

### Setup and teardown

Testy provides setup and teardown hooks.

```ts
@testSuite('Sum Test Suite')
class MyTestSuite {

    @beforeAll()
    beforeAll() {
        // This is executed before all the test
    }

    @beforeEach()
    beforeEach() {
        // This is executed before each test
    }

    @afterEach()
    afterEach() {
        // This is executed after each test
    }
    
    @afterAll()
    afterAll() {
        // This is executed after all the test
    }
}
```

### Reuse code!

This is where stuff gets interesting. Testy allows you to use base test classes. The base test can have setup and teardown methods. Your child test suite may also have setup and teardown methods. In that case, the base test methods are executed before.

```ts
class MyBaseTestSuite{
    // Setup/teardown extravaganza
}

@testSuite('My Test Suite')
class MyTestSuite extends MyBaseTestSuite {
    // My tests
}
```

### Asserting

There's a whole bunch of assertion methods and also a dash of syntactic sugar sexyness in the expect class.

```ts
expect.toBeEqual('a', 'a');
expect.not.toBeEqual('p', 'np');
expect.toThrow(() => someNastyMethod());
expect.toBeTrue(2 > 1);
// More...
```

## Run the tests

To run the tests, use the following command

```
$ testy
$ testy --config custom/config/file.json // To specify a custom configuration file
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](./LICENSE)