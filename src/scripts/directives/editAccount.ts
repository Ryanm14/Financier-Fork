// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('editAccount', ($compile, $timeout, $rootScope) => {
  return {
    restrict: 'A',
    bindToController: {
      editAccount: '=',
      onAccountChange: '&',
      onRemoveAccount: '&'
    },
    controllerAs: 'editAccountCtrl',
    controller: function ($scope, $element) {
      $element.on('contextmenu', (e: any) => {
        e.preventDefault();

        $rootScope.$broadcast('account:deselectTransactions');
        $rootScope.$broadcast('drop:close');

        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        const template = require('./editAccount.html');

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
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'IDirective... Remove this comment to see the full error message
          this.name = this.editAccount.name;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'note' does not exist on type 'IDirective... Remove this comment to see the full error message
          this.note = this.editAccount.note;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkNumber' does not exist on type 'IDi... Remove this comment to see the full error message
          this.checkNumber = this.editAccount.checkNumber;

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
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAccount' does not exist on type 'IDi... Remove this comment to see the full error message
          const saveFn = this.editAccount.fn;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAccount' does not exist on type 'IDi... Remove this comment to see the full error message
          this.editAccount.fn = null;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAccount' does not exist on type 'IDi... Remove this comment to see the full error message
          this.editAccount.name = this.name;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAccount' does not exist on type 'IDi... Remove this comment to see the full error message
          this.editAccount.note = this.note;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAccount' does not exist on type 'IDi... Remove this comment to see the full error message
          this.editAccount.checkNumber = this.checkNumber;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAccount' does not exist on type 'IDi... Remove this comment to see the full error message
          this.editAccount.fn = saveFn;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAccount' does not exist on type 'IDi... Remove this comment to see the full error message
          this.editAccount.emitChange();

          dropInstance.close();
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'close' does not exist on type 'IDirectiv... Remove this comment to see the full error message
        this.close = () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAccount' does not exist on type 'IDi... Remove this comment to see the full error message
          this.editAccount.closed = true;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'onAccountChange' does not exist on type ... Remove this comment to see the full error message
          this.onAccountChange();
          dropInstance.close();
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'open' does not exist on type 'IDirective... Remove this comment to see the full error message
        this.open = () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'editAccount' does not exist on type 'IDi... Remove this comment to see the full error message
          this.editAccount.closed = false;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'onAccountChange' does not exist on type ... Remove this comment to see the full error message
          this.onAccountChange();
          dropInstance.close();
        };

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type 'IDirecti... Remove this comment to see the full error message
        this.remove = () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'onRemoveAccount' does not exist on type ... Remove this comment to see the full error message
          this.onRemoveAccount({ account: this.editAccount });

          dropInstance.close();
        };


        dropInstance.open();
      });

    }
  };
});
