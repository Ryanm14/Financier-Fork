angular.module('financier').directive('memoInput', $rootScope => {
  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
      category: '='
    },
    template: '<input type="text" ng-model="ngModel"></input>',
    compile: () => {
      return {
        pre: (scope, element) => {
          const input = element.find('input');

          scope.$on('transaction:memo:focus', (e, { index } = {}) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'splitIndex' does not exist on type 'ISco... Remove this comment to see the full error message
            if (index === scope.$parent.splitIndex) {
              element.find('input')[0].focus();
            }
          });

          input.on('keydown', e => {
            if (e.which === 13) { // enter
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'IScope... Remove this comment to see the full error message
              if (scope.category && scope.category.indexOf('income') !== -1) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'splitIndex' does not exist on type 'ISco... Remove this comment to see the full error message
                $rootScope.$broadcast('transaction:inflow:focus', { index: scope.$parent.splitIndex });
              } else {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'splitIndex' does not exist on type 'ISco... Remove this comment to see the full error message
                $rootScope.$broadcast('transaction:outflow:focus', { index: scope.$parent.splitIndex });
              }
            }
          });
        }
      };
    }

  };
});
