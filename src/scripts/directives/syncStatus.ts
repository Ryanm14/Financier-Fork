angular.module('financier').directive('syncStatus', function ($translate) {
  return {
    restrict: 'E',
    template: '{{syncCtrl.textStatus}}',
    bindToController: {
      status: '='
    },
    controllerAs: 'syncCtrl',
    controller: function ($scope, $element) {
      $element.addClass('sync-status');

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'status' does not exist on type 'IDirecti... Remove this comment to see the full error message
      $scope.$watch(() => this.status, (status: any) => {
        // SYNCING, SYNC_COMPLETE, SYNC_ERROR
        if (angular.isString(status)) {
          if (status.indexOf('sync') === -1) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'textStatus' does not exist on type 'IDir... Remove this comment to see the full error message
            this.textStatus = $translate.instant(`SYNC_${status.toUpperCase()}`);
          } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'textStatus' does not exist on type 'IDir... Remove this comment to see the full error message
            this.textStatus = $translate.instant(status.toUpperCase());
          }
        }
      });
      
      $scope.$watch('userCtrl.status', (newStatus: any, oldStatus: any) => {
        $element.removeClass(`sync-status--${oldStatus}`);
        $element.addClass(`sync-status--${newStatus}`);
      });

      $element.attr('title', $translate.instant('SYNC_STATUS_HELP'));
    }
  };
});
