import moment from 'moment';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'unde... Remove this comment to see the full error message
import { throttle } from 'underscore';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('monthSelector', function () {
  return {
    restrict: 'E',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('./monthSelector.html'),
    require: 'ngModel',
    scope: {
      ngModel: '=',
      showMonths: '='
    },
    link: function (scope, element, attrs, ngModelCtrl) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IScope'.
      scope.months = [];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'today' does not exist on type 'IScope'.
      scope.today = moment().startOf('month');

      scope.$watchCollection(() => [
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        ngModelCtrl.$modelValue,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMonths' does not exist on type 'ISco... Remove this comment to see the full error message
        scope.showMonths
      ], function ([newValue, showMonths]) {
        // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
        if (angular.isDefined(newValue)) {
          const modelMonth = moment(newValue);

          for (let i = 0; i < 12; i++) {
            const month = moment(newValue).month(i);

            // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
            if (!angular.isDefined(scope.months[i])) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IScope'.
              scope.months[i] = [];
            }
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IScope'.
            scope.months[i].date = month;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IScope'.
            scope.months[i].view = modelMonth.diff(month, 'months') > -showMonths &&
                                   modelMonth.diff(month, 'months') <= 0;
          }
        }
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'nextMonth' does not exist on type 'IScop... Remove this comment to see the full error message
      scope.nextMonth = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
        scope.ngModel = moment(scope.ngModel).add(1, 'month').toDate();
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'previousMonth' does not exist on type 'I... Remove this comment to see the full error message
      scope.previousMonth = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
        scope.ngModel = moment(scope.ngModel).subtract(1, 'month').toDate();
      };

      const onResize = throttle(() => {
        changeHeaderStyle();
        scope.$apply();
      }, 250);

      window.addEventListener('resize', onResize, false);

      scope.$on('$destroy', () => {
        window.removeEventListener('resize', onResize, false);
      });

      function changeHeaderStyle() {
        if (document.body.clientWidth < 990) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'limitTo' does not exist on type 'IScope'... Remove this comment to see the full error message
          scope.limitTo = 1;
        } else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'limitTo' does not exist on type 'IScope'... Remove this comment to see the full error message
          scope.limitTo = null;
        }

        if (document.body.clientWidth < 1484) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateFormat' does not exist on type 'ISco... Remove this comment to see the full error message
          scope.dateFormat = 'MMM';
        } else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'dateFormat' does not exist on type 'ISco... Remove this comment to see the full error message
          scope.dateFormat = 'MMMM';
        }
      }

      changeHeaderStyle();

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setMonth' does not exist on type 'IScope... Remove this comment to see the full error message
      scope.setMonth = function (date: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
        scope.ngModel = date;
      };
    }
  };
});
