// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'unde... Remove this comment to see the full error message
import { throttle } from 'underscore';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('flexMonths', ($rootScope) => {
  return {
    restrict: 'A',
    link: function (scope, element) {
      let flexMonths = Math.floor((element[0].offsetWidth - 175) / 260);
      $rootScope.$emit('budget:columns', flexMonths);

      const onResize = throttle(() => {
        flexMonths = Math.floor((element[0].offsetWidth - 175) / 260);
        $rootScope.$emit('budget:columns', flexMonths);

        $rootScope.$apply();
      }, 250);

      window.addEventListener('resize', onResize, false);

      scope.$on('$destroy', () => {
        window.removeEventListener('resize', onResize, false);
      });
    }
  };
});
