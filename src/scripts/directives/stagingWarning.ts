angular.module('financier').directive('stagingWarning', () => {
  let show: any;

  function controller(this: any) {
    const isStaging = location.hostname.indexOf('staging') > -1;
    this.show = angular.isDefined(show) ? show : isStaging;

    this.close = () => {
      this.show = false;
      show = false;
    };
  }

  return {
    restrict: 'E',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('./stagingWarning.html'),
    controller,
    replace: true,
    controllerAs: 'stagingWarningCtrl'
  };
});
