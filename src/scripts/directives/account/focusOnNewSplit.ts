angular.module('financier').directive('focusOnNewSplit', () => {
  return {
    restrict: 'A',
    link: (scope, element) => {
      scope.$on('split:new', () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '$last' does not exist on type 'IScope'.
        if (scope.$last) {
          element.find('input')[0].focus();
        }
      });
    }
  };
});
