#!/usr/bin/env node

import 'reflect-metadata';
import { LoggerFactory } from './lib/logger/loggerFactory';
import { TestyCli } from './lib/cli/testyCli';
import * as tsnode from 'ts-node';

const tsconfig = require('../tsconfig.json');
tsnode.register(tsconfig);
const logger = LoggerFactory.create();
const cli = new TestyCli(logger);
cli.handle(process.argv);

