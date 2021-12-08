angular.module('financier').directive('accountSuggest', $rootScope => {
  return {
    restrict: 'E',
    scope: {
      onBudgetAccounts: '=',
      offBudgetAccounts: '=',
      closedAccounts: '=',
      ngModel: '=',
      transactionPayeeId: '='
    },
    template: '<autosuggest custom-filter="itemFilter(item, searchValue)" on-submit="onSubmit()" ng-model="item" items="items" template="template"></autosuggest>',
    compile: () => {
      return {
        pre: scope => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          scope.items = [];

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'itemFilter' does not exist on type 'ISco... Remove this comment to see the full error message
          scope.itemFilter = (item: any) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transactionPayeeId' does not exist on ty... Remove this comment to see the full error message
            if (item.id === scope.transactionPayeeId) {
              return false;
            }

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'item' does not exist on type 'IScope'.
            if ((!scope.item || !scope.item.closed) && item.closed) {
              return false;
            }

            return true;
          };

          scope.$watch('transactionPayeeId', () => {
            scope.$broadcast('autosuggest:filter');
          });

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          scope.items = scope.onBudgetAccounts
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'offBudgetAccounts' does not exist on typ... Remove this comment to see the full error message
              .concat(scope.offBudgetAccounts)
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'closedAccounts' does not exist on type '... Remove this comment to see the full error message
              .concat(scope.closedAccounts);

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          for (let i = 0; i < scope.items.length; i++) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
            if (scope.items[i].id === scope.ngModel) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'item' does not exist on type 'IScope'.
              scope.item = scope.items[i];
            }
          }

          scope.$watch('item', (newItem, oldItem) => {
            if (newItem !== oldItem) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
              scope.ngModel = newItem.id;
            }
          });

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSubmit' does not exist on type 'IScope... Remove this comment to see the full error message
          scope.onSubmit = () => {
            $rootScope.$broadcast('transaction:date:focus');
          };

          scope.$on('transaction:account:focus', () => {
            scope.$broadcast('focus');
          });

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'template' does not exist on type 'IScope... Remove this comment to see the full error message
          scope.template = require('./accountSuggest.html');
        }
      };
    }

  };
});
