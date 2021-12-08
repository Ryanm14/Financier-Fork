angular.module('financier').directive('checkNumberInput', $rootScope => {
  return {
    restrict: 'A',
    scope: {
      checkNumber: '=',
      transactions: '='
    },
    compile: () => {
      return {
        pre: (scope, element) => {
          const input = element.find('input');

          scope.$on('transaction:check:focus', () => {
            input[0].focus();
          });

          input.on('keydown', e => {
            if (e.which === 13) { // enter
              $rootScope.$broadcast('transaction:payee:focus');

              // go next
              $rootScope.$apply();
            } else if (e.which === 38) { // up
              let checkNumber = getCurrentCheckNumber();

              if (!isNaN(checkNumber)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkNumber' does not exist on type 'ISc... Remove this comment to see the full error message
                scope.checkNumber = ++checkNumber;
              }

              e.preventDefault();

              $rootScope.$apply();
            } else if (e.which === 40) { // down
              let checkNumber = getCurrentCheckNumber();

              if (!isNaN(checkNumber)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkNumber' does not exist on type 'ISc... Remove this comment to see the full error message
                scope.checkNumber = --checkNumber;
              }

              e.preventDefault();

              $rootScope.$apply();
            }
          });

          function getCurrentCheckNumber() {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkNumber' does not exist on type 'ISc... Remove this comment to see the full error message
            const thisCheckNumber = +scope.checkNumber;

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'checkNumber' does not exist on type 'ISc... Remove this comment to see the full error message
            if (scope.checkNumber != null && !isNaN(thisCheckNumber)) {
              return thisCheckNumber;
            }

            let foundCheckNumber = 0;

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transactions' does not exist on type 'IS... Remove this comment to see the full error message
            if (scope.transactions) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'transactions' does not exist on type 'IS... Remove this comment to see the full error message
              scope.transactions.forEach((transaction: any) => {
                const checkNumber = +transaction.checkNumber;

                if (!isNaN(checkNumber) && checkNumber > foundCheckNumber) {
                  foundCheckNumber = checkNumber;
                }
              });
            }

            return foundCheckNumber;
          }
        }
      };
    }
  };
});
