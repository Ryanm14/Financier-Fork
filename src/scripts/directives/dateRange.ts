// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';
import moment from 'moment';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('dateRange', ($filter, $compile, $timeout) => {
  const dateFilter = $filter('date');

  return {
    restrict: 'E',
    template: `<div ng-if="all">All dates</div>
               <div ng-if="!all">{{start}} - {{end}}</div>`,
    scope: {
      startDate: '=',
      endDate: '='
    },
    link: (scope, element) => {
      scope.$watch('startDate', startDate => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'all' does not exist on type 'IScope'.
        scope.all = !isFinite(startDate);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'start' does not exist on type 'IScope'.
        scope.start = dateFilter(startDate, 'MMM yy');
      });
      scope.$watch('endDate', endDate => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'all' does not exist on type 'IScope'.
        scope.all = !isFinite(endDate);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'end' does not exist on type 'IScope'.
        scope.end = dateFilter(endDate, 'MMM yy');
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'select' does not exist on type 'IScope'.
      scope.select = {
        everything() {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'startDate' does not exist on type 'IScop... Remove this comment to see the full error message
          scope.startDate = -Infinity;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDate' does not exist on type 'IScope'... Remove this comment to see the full error message
          scope.endDate = Infinity;
        },
        last12() {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'startDate' does not exist on type 'IScop... Remove this comment to see the full error message
          scope.startDate = moment().subtract(1, 'year').endOf('month').toDate();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDate' does not exist on type 'IScope'... Remove this comment to see the full error message
          scope.endDate = new Date();
        },
        last3() {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'startDate' does not exist on type 'IScop... Remove this comment to see the full error message
          scope.startDate = moment().subtract(3, 'months').endOf('month').toDate();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDate' does not exist on type 'IScope'... Remove this comment to see the full error message
          scope.endDate = new Date();
        },
        thisYear() {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'startDate' does not exist on type 'IScop... Remove this comment to see the full error message
          scope.startDate = moment().startOf('year').toDate();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDate' does not exist on type 'IScope'... Remove this comment to see the full error message
          scope.endDate = new Date();
        },
        lastYear() {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'startDate' does not exist on type 'IScop... Remove this comment to see the full error message
          scope.startDate = moment().subtract(1, 'year').startOf('year').toDate();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'endDate' does not exist on type 'IScope'... Remove this comment to see the full error message
          scope.endDate = moment().subtract(1, 'year').endOf('year').toDate();
        }
      };

      element.on('click', () => {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        const template = require('./dateRange.html');

        // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
        const wrap = angular.element('<div></div>').append(template);
        const content = $compile(wrap)(scope);

        content.on('keypress keydown', (e: any) => {
          if (e.which === 27) {
            dropInstance.close();
          } else if (e.which === 13 && (e.ctrlKey || e.metaKey)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'submit' does not exist on type 'IScope'.
            scope.submit();

            dropInstance.close();
          }
        });

        const dropInstance = new Drop({
          target: element[0],
          content: content[0],
          classes: 'drop-theme-arrows-bounce',
          openOn: 'click',
          tetherOptions: {
            targetOffset: '0 -19px',
            optimizations: {
              moveElement: true
            }
          }
        });

        dropInstance.on('open', () => {
          // scope.myNote = ngModelCtrl.$viewValue;
          // scope.canDelete = ngModelCtrl.$viewValue &&
          //                   ngModelCtrl.$viewValue.length;

          content.find('textarea')[0].focus();
        });

        dropInstance.on('close', () => {
          // scope.myNote = ngModelCtrl.$viewValue;

          $timeout(() => {
            dropInstance.destroy();
          });
        });

        scope.$on('drop:close', () => {
          dropInstance.close();
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'submit' does not exist on type 'IScope'.
        scope.submit = () => {
          // ngModelCtrl.$setViewValue(note);

          dropInstance.close();
        };


        dropInstance.open();
      });
    }
  };
});
