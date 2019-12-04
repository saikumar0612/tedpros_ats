// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./app/authorization', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

const context1 = require.context('./app/config', true, /\.spec\.ts$/);
context1.keys().map(context1);

const context2 = require.context('./app/crm', true, /\.spec\.ts$/);
context2.keys().map(context2);

const context3 = require.context('./app/dashboard', true, /\.spec\.ts$/);
context3.keys().map(context3);

const context4 = require.context('./app/leave-configuration', true, /\.spec\.ts$/);
context4.keys().map(context4);

const context7 = require.context('./app/pmo', true, /\.spec\.ts$/);
context7.keys().map(context7);

const context8 = require.context('./app/qualifications', true, /\.spec\.ts$/);
context8.keys().map(context8);

const context9 = require.context('./app/recruitment', true, /\.spec\.ts$/);
context9.keys().map(context9);

const context10 = require.context('./app/shared', true, /\.spec\.ts$/);
context10.keys().map(context10);

const context11 = require.context('./app/uam', true, /\.spec\.ts$/);
context11.keys().map(context11);

const context12 = require.context('./app/employee-handbook', true, /\.spec\.ts$/);
context12.keys().map(context12);

// // rec
// const context5 = require.context('./app/leaves', true, /\.spec\.ts$/);
// context5.keys().map(context5);

// const context6 = require.context('./app/pim', true, /\.spec\.ts$/);
// context6.keys().map(context6);
