#!/usr/bin/env node

import 'reflect-metadata';
import { LoggerFactory } from './lib/logger/loggerFactory';
import { TestyCli } from './lib/cli/testyCli';
import { TestVisitorFactory } from './lib/tests/visitors/testVisitor.factory';
import { JsonLoader } from './lib/utils/jsonLoader.service';
import { TestsLoader } from './lib/utils/testsLoader';

const logger = LoggerFactory.create();
const testVisitorFactory = new TestVisitorFactory(logger);
const jsonLoader = new JsonLoader();
const testsLoader = new TestsLoader(logger);
const cli = new TestyCli(logger, testVisitorFactory, jsonLoader, testsLoader);
cli.handle(process.argv);
