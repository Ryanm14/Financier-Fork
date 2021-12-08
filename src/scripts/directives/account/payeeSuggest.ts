angular.module('financier').directive('payeeSuggest', $rootScope => {
  return {
    restrict: 'E',
    scope: {
      accounts: '=',
      payees: '=',
      transactionAccountId: '=',
      ngModel: '='
    },
    template: '<autosuggest can-submit-new="true" on-submit="onSubmit()" custom-filter="itemFilter(item, searchValue, pristineInputField)" ng-model="ngModel" items="items" template="template"></autosuggest>',
    compile: () => {
      return {
        pre: (scope, element) => {
          const byName = (a: any, b: any) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();

            if (nameA < nameB) {
              return -1;
            }

            if (nameA > nameB) {
              return 1;
            }

            return 0;
          };


          // @ts-expect-error ts-migrate(2339) FIXME: Property '_accounts' does not exist on type 'IScop... Remove this comment to see the full error message
          scope._accounts = scope.accounts
          .filter((acc: any) => acc.onBudget && !acc.closed)
          .sort((a: any, b: any) => {
            return a.sort - b.sort;
          })
          .concat(
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'accounts' does not exist on type 'IScope... Remove this comment to see the full error message
            scope.accounts
            .filter((acc: any) => !acc.onBudget && !acc.closed)
            .sort((a: any, b: any) => {
              return a.sort - b.sort;
            })
          )
          .concat(
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'accounts' does not exist on type 'IScope... Remove this comment to see the full error message
            scope.accounts
            .filter((acc: any) => acc.closed)
            .sort((a: any, b: any) => {
              return a.sort - b.sort;
            })
          );

          // @ts-expect-error ts-migrate(2339) FIXME: Property '_payees' does not exist on type 'IScope'... Remove this comment to see the full error message
          scope._payees = Object.keys(scope.payees).map(key => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'payees' does not exist on type 'IScope'.
            return scope.payees[key];
          })
          .sort(byName);

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          scope.items = scope._accounts
          // @ts-expect-error ts-migrate(2339) FIXME: Property '_payees' does not exist on type 'IScope'... Remove this comment to see the full error message
          .concat(scope._payees);

          scope.$watch('transactionAccountId', () => {
            scope.$broadcast('autosuggest:filter');
          });

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'itemFilter' does not exist on type 'ISco... Remove this comment to see the full error message
          scope.itemFilter = (item: any, searchInput: any, pristineInputField: any) => {
            if (item.autosuggest === false) {
              return false;
            }

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
            if (!(scope.ngModel && scope.ngModel.constructorName === 'Account' && scope.ngModel.closed) && item.constructorName === 'Account' && item.closed) {
              return false;
            }

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transactionAccountId' does not exist on ... Remove this comment to see the full error message
            if (item.id === scope.transactionAccountId) {
              return false;
            }

            if (pristineInputField) {
              return true;
            }

            const searchInputLower = searchInput.toLowerCase();

            return item.name.toLowerCase().indexOf(searchInputLower) !== -1;
          };

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSubmit' does not exist on type 'IScope... Remove this comment to see the full error message
          scope.onSubmit = () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'accountCtrl' does not exist on type 'ISc... Remove this comment to see the full error message
            const account = scope.$parent.accountCtrl.manager.getAccount(scope.transactionAccountId);

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
            if (scope.ngModel.constructorName === 'Account' && (
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
                (scope.ngModel.onBudget && account.onBudget) ||
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
                (!scope.ngModel.onBudget && !account.onBudget)
              )) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'splitIndex' does not exist on type 'ISco... Remove this comment to see the full error message
              $rootScope.$broadcast('transaction:memo:focus', { index: scope.$parent.splitIndex });
            } else {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'splitIndex' does not exist on type 'ISco... Remove this comment to see the full error message
              $rootScope.$broadcast('transaction:category:focus', { index: scope.$parent.splitIndex });
            }
          };

          scope.$on('transaction:payee:focus', (e, { index } = {}) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'splitIndex' does not exist on type 'ISco... Remove this comment to see the full error message
            if (index === scope.$parent.splitIndex) {
              element.find('input')[0].focus();
              scope.$broadcast('focus');
            }
          });

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'template' does not exist on type 'IScope... Remove this comment to see the full error message
          scope.template = require('./payeeSuggest.html');
        }
      };
    }

  };
});
