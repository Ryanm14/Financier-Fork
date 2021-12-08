angular.module('financier').directive('applyUpdate', offline => {
  let show = false;

  function controller(this: any, $scope: any) {
    this.show = show;

    $scope.$on('serviceWorker:updateReady', () => {
      offline.applyUpdate();
    });

    $scope.$on('serviceWorker:updated', () => {
      show = true;
      this.show = true;

      $scope.$apply();
    });

    this.close = () => {
      this.show = false;
      show = false;
    };

    this.applyUpdate = () => {
      window.location.reload(true);
    };
  }

  return {
    restrict: 'E',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('./applyUpdate.html'),
    controller,
    replace: true,
    controllerAs: 'applyUpdateCtrl'
  };
});
