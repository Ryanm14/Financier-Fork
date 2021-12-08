// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'node... Remove this comment to see the full error message
import uuid from 'node-uuid';

// por que no?

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').factory('uuid', function () {
  return uuid.v4;
});
