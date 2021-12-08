// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.


import 'angular';
import 'angular-mocks/angular-mocks';

import './app';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'pouc... Remove this comment to see the full error message
import PouchDB from 'pouchdb';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'pouc... Remove this comment to see the full error message
import memory from 'pouchdb-adapter-memory';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
window.Promise = require('es6-promise').Promise;

PouchDB.plugin(memory);

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const context = require.context('.', true, /\.spec.js$/);

context.keys().forEach(context);
