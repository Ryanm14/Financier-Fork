// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('quickBudgetOne', ($compile, $timeout) => {
  return {
    restrict: 'A',
    controller: function ($scope, $element) {

      // Get the last month's budget values, and put them into the corresponding
      // current month's categories (but only if their budget value is not set)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'lastMonth' does not exist on type 'IDire... Remove this comment to see the full error message
      this.lastMonth = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IDirecti... Remove this comment to see the full error message
        const lastMonth = this.months[this.months.indexOf(this.month) - 1];

        if (lastMonth) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
          this.month.categories[this.catId].budget = lastMonth.categories[this.catId].budget;
        } else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
          this.month.categories[this.catId].budget = 0;
        }
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'average' does not exist on type 'IDirect... Remove this comment to see the full error message
      this.average = () => {
        let accumulator = 0;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IDirecti... Remove this comment to see the full error message
        let monthIndex = this.months.indexOf(this.month) - 1;

        for (let i = monthIndex; i >= 0 && i > monthIndex - 3; i--) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IDirecti... Remove this comment to see the full error message
          accumulator += this.months[i].categories[this.catId].budget;
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
        this.month.categories[this.catId].budget = Math.round(accumulator / 3);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clear' does not exist on type 'IDirectiv... Remove this comment to see the full error message
      this.clear = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
        this.month.categories[this.catId].budget = 0; 
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'zero' does not exist on type 'IDirective... Remove this comment to see the full error message
      this.zero = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
        this.month.categories[this.catId].budget -= this.month.categoryCache[this.catId].balance;
      };

      $element.on('mousedown', () => {
        $element.addClass('budget__auto-suggest--open');
      });

      $element.on('click', () => {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        const template = require('./quickBudgetOne.html');
        let dropInstance: any;

        // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
        const wrap = angular.element('<div class="tooltip"></div>').append(template);
        const content = $compile(wrap)($scope);

        content.on('click', () => {
          dropInstance.close();
        });

        dropInstance = new Drop({
          target: $element[0],
          content: content[0],
          classes: 'drop-theme-arrows-bounce',
          openOn: 'click',
          position: 'bottom center',
          tetherOptions: {
            optimizations: {
              moveElement: true
            }
          }
        });

        dropInstance.open();

        setTimeout(() => {
          dropInstance.position();
        });

        $scope.$on('drop:close', () => {
          dropInstance.close();
        });

        dropInstance.on('close', () => {
          $timeout(() => {
            dropInstance.destroy();
            $element.removeClass('budget__auto-suggest--open');
          });
        });

      });
    },
    controllerAs: 'quickBudgetOneCtrl',
    bindToController: {
      months: '=',
      month: '=',
      catId: '='
    }
  };
});
