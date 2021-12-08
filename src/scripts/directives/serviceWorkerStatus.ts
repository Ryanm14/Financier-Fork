angular.module('financier').directive('serviceWorkerStatus', () => {
  return {
    restrict: 'E',
    scope: false,
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('./serviceWorkerStatus.html')
  };
});
