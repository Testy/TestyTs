#!/usr/bin/env node

import 'reflect-metadata';
import { LoggerFactory } from './lib/logger/loggerFactory';
import { TestyCli } from './lib/cli/testyCli';

const logger = LoggerFactory.create();
const cli = new TestyCli(logger);
cli.handle(process.argv);

