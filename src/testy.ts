#!/usr/bin/env node

import 'reflect-metadata';
import { LoggerFactory } from './lib/logger/loggerFactory';
import { TestyCli } from './lib/cli/testyCli';
import { TestVisitorFactory } from './lib/tests/visitors/testVisitor.factory';

const logger = LoggerFactory.create();
const testVisitorFactory = new TestVisitorFactory(logger);
const cli = new TestyCli(logger, testVisitorFactory);
cli.handle(process.argv);

