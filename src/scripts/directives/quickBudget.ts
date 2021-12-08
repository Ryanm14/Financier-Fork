// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('quickBudget', ($compile, $timeout) => {
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
          for (let id in this.month.categories) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
            if (this.month.categories.hasOwnProperty(id)) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
              if (!this.month.categories[id].budget && lastMonth.categories[id]) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
                this.month.categories[id].budget = lastMonth.categories[id].budget;
              }
            }
          }
        }
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'average' does not exist on type 'IDirect... Remove this comment to see the full error message
      this.average = () => {
        const averages = {};

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IDirecti... Remove this comment to see the full error message
        let monthIndex = this.months.indexOf(this.month) - 1;

        for (let i = monthIndex; i >= 0 && i > monthIndex - 3; i--) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IDirecti... Remove this comment to see the full error message
          for (let id in this.months[i].categories) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'months' does not exist on type 'IDirecti... Remove this comment to see the full error message
            if (this.months[i].categories.hasOwnProperty(id)) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              averages[id] = averages[id] || 0;
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              averages[id] += this.months[i].categories[id].budget;
            }
          }
        }

        for (let id in averages) {
          if (averages.hasOwnProperty(id)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
            if (!this.month.categories[id].budget) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
              this.month.categories[id].budget = Math.round(averages[id] / 3);
            }
          }
        }
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clear' does not exist on type 'IDirectiv... Remove this comment to see the full error message
      this.clear = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
        for (let id in this.month.categories) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
          if (this.month.categories.hasOwnProperty(id)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
            this.month.categories[id].budget = 0;
          }
        }
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'zero' does not exist on type 'IDirective... Remove this comment to see the full error message
      this.zero = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
        for (let id in this.month.categories) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
          if (this.month.categories.hasOwnProperty(id)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type 'IDirectiv... Remove this comment to see the full error message
            this.month.categories[id].budget -= this.month.categoryCache[id].balance;
          }
        }
      };




      $element.on('click', () => {

        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        const template = require('./quickBudget.html');
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
          position: 'top center',
          tetherOptions: {
            constraints: [{
              to: 'window',
              attachment: 'together',
              pin: true
            }]
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
          });
        });

      });
    },
    controllerAs: 'quickBudgetCtrl',
    bindToController: {
      months: '=',
      month: '='
    }
  };
});
