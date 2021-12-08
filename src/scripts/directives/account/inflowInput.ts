angular.module('financier').directive('inflowInput', $rootScope => {
  return {
    restrict: 'E',
    scope: {
      ngModel: '='
    },
    template: '<input type="text" transaction-value ng-model="ngModel">',
    compile: () => {
      return {
        pre: (scope, element) => {
          const input = element.find('input');

          scope.$on('transaction:inflow:focus', (e, { index } = {}) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'splitIndex' does not exist on type 'ISco... Remove this comment to see the full error message
            if (index === scope.$parent.splitIndex) {
              input[0].focus();
            }
          });

          input.on('keydown', e => {
            if (e.which === 13) { // enter
              scope.$emit('submit');
              $rootScope.$apply();
            }
          });
        }
      };
    }

  };
});
