// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('editAllAccounts', ($compile, $timeout, $rootScope) => {
  return {
    restrict: 'A',
    bindToController: {
      editAllAccounts: '='
    },
    controllerAs: 'editAllAccountsCtrl',
    controller: function ($scope, $element) {
      $element.on('contextmenu', (e: any) => {
        e.preventDefault();

        $rootScope.$broadcast('account:deselectTransactions');
        $rootScope.$broadcast('drop:close');

        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        const template = require('./editAllAccounts.html');

        // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
        const wrap = angular.element('<div></div>').append(template);
        const content = $compile(wrap)($scope);

        content.on('keypress keydown', (e: any) => {
          if (e.which === 27) {
            dropInstance.close();
          }
        });

        const dropInstance = new Drop({
          target: $element[0],
          content: content[0],
          classes: 'drop-theme-arrows-bounce edit-account__positioner',
          position: 'left top',
          openOn: 'click'
        });

        dropInstance.on('open', () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkNumber' does not exist on type 'IDi... Remove this comment to see the full error message
          this.checkNumber = this.editAllAccounts.checkNumber;

          content.find('input')[0].focus();
        });

        dropInstance.on('close', () => {
          $timeout(() => {
            dropInstance.destroy();
          });
        });

        $scope.$on('drop:close', () => {
          dropInstance.close();
        });

        $scope.remove = () => {
          dropInstance.close();
          $scope.onRemove();
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'submit' does not exist on type 'IDirecti... Remove this comment to see the full error message
        this.submit = () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAllAccounts' does not exist on type ... Remove this comment to see the full error message
          this.editAllAccounts.checkNumber = this.checkNumber;

          dropInstance.close();
        };

        dropInstance.open();
      });

    }
  };
});
