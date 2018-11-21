#!/usr/bin/env node

const tsconfig = require('../../tsconfig.json');
require('ts-node').register({ compilerOptions: tsconfig.compilerOptions });
require('../testy').main(process.argv);