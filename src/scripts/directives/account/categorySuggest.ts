import moment from 'moment';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('categorySuggest', ($rootScope, $filter, $translate) => {
  const dateFilter = $filter('date');

  return {
    restrict: 'E',
    scope: {
      categories: '=',
      masterCategories: '=',
      ngModel: '=',
      transactionDate: '=',
      ngDisabled: '='
    },
    template: '<autosuggest ng-disabled="ngDisabled" on-submit="onSubmit()" custom-filter="categoryFilter(item, searchValue, pristineInputField)" ng-model="item" items="items" template="template"></autosuggest>',
    compile: () => {
      return {
        pre: (scope, element, attrs) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableSplit' does not exist on type 'IS... Remove this comment to see the full error message
          scope.disableSplit = angular.isDefined(attrs.disableSplit);

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'splits' does not exist on type 'IScope'.
          scope.splits = [{
            name: $translate.instant('MULTIPLE_CATEGORIES'),
            id: 'split'
          }];

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'incomes' does not exist on type 'IScope'... Remove this comment to see the full error message
          scope.incomes = [{
            name: '',
            id: 'income'
          }, {
            name: '',
            id: 'incomeNextMonth'
          }];

          scope.$watch('transactionDate', (newDate, oldDate) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'incomes' does not exist on type 'IScope'... Remove this comment to see the full error message
            scope.incomes[0].name = $translate.instant('INCOME_FOR', {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'transactionDate' does not exist on type ... Remove this comment to see the full error message
              month: dateFilter(scope.transactionDate || new Date(), 'LLLL')
            });

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'incomes' does not exist on type 'IScope'... Remove this comment to see the full error message
            scope.incomes[1].name = $translate.instant('INCOME_FOR', {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'transactionDate' does not exist on type ... Remove this comment to see the full error message
              month: dateFilter(moment(scope.transactionDate || new Date()).add(1, 'month').toDate(), 'LLLL')
            });

            // Don't needlessly trigger upon init
            if (oldDate !== newDate) {
              // Only trigger if income is selected
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'incomes' does not exist on type 'IScope'... Remove this comment to see the full error message
              if (scope.incomes.indexOf(scope.item) !== -1) {
                scope.$broadcast('autosuggest:updateText');
              }
            }
          });

          // flatten categories
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          scope.items = [].concat.apply(
            [],
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategories' does not exist on type... Remove this comment to see the full error message
            Object.keys(scope.masterCategories)
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategories' does not exist on type... Remove this comment to see the full error message
              .sort((a, b) => scope.masterCategories[a].sort - scope.masterCategories[b].sort)
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategories' does not exist on type... Remove this comment to see the full error message
              .map(id => scope.masterCategories[id].categories)
          );

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategoriesArr' does not exist on t... Remove this comment to see the full error message
          scope.masterCategoriesArr = Object.keys(scope.masterCategories)
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategories' does not exist on type... Remove this comment to see the full error message
            .map(id => scope.masterCategories[id])
            .sort((a, b) => a.sort - b.sort);

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          scope.items = scope.incomes.concat(scope.items);

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableSplit' does not exist on type 'IS... Remove this comment to see the full error message
          if (!scope.disableSplit) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
            scope.items = scope.splits.concat(scope.items);
          }

          let setByParent = false,
            firstRun = true;

          scope.$watch('ngModel', () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
            for (let i = 0; i < scope.items.length; i++) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
              if (scope.items[i].id === scope.ngModel) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'item' does not exist on type 'IScope'.
                if (!scope.item || scope.ngModel !== scope.item.id) {
                  if (!firstRun) {
                    setByParent = true;
                  } else {
                    firstRun = true;
                  }
                }

                // @ts-expect-error ts-migrate(2339) FIXME: Property 'item' does not exist on type 'IScope'.
                scope.item = scope.items[i];
              }
            }
          });

          scope.$watch('item', (newItem, oldItem) => {

            if (newItem !== oldItem) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
              if (scope.ngModel !== newItem.id) {
                setByParent = false;
              }

              // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngModel' does not exist on type 'IScope'... Remove this comment to see the full error message
              scope.ngModel = newItem.id;
            }
          });

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryFilter' does not exist on type '... Remove this comment to see the full error message
          scope.categoryFilter = (item: any, searchInput: any, pristineInputField: any) => {
            if (pristineInputField || setByParent) {
              return true;
            }

            const searchInputLower = searchInput.toLowerCase();

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategories' does not exist on type... Remove this comment to see the full error message
            for (let id in scope.masterCategories) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategories' does not exist on type... Remove this comment to see the full error message
              if (scope.masterCategories.hasOwnProperty(id) &&
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategories' does not exist on type... Remove this comment to see the full error message
                  scope.masterCategories[id].categories.indexOf(name.id || name) !== -1) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategories' does not exist on type... Remove this comment to see the full error message
                if (scope.masterCategories[id].name &&
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'masterCategories' does not exist on type... Remove this comment to see the full error message
                    scope.masterCategories[id].name.toLowerCase().indexOf(searchInputLower) !== -1) {
                  return true;
                }
              }
            }

            // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
            if (angular.isString(item)) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'categories' does not exist on type 'ISco... Remove this comment to see the full error message
              return scope.categories[item] &&
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'categories' does not exist on type 'ISco... Remove this comment to see the full error message
                scope.categories[item].name.toLowerCase().indexOf(searchInputLower) !== -1;
            }

            return item.name && item.name.toLowerCase().indexOf(searchInputLower) !== -1;

          };

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'getCategoryBalance' does not exist on ty... Remove this comment to see the full error message
          scope.getCategoryBalance = (categoryId: any, date: any) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'accountCtrl' does not exist on type 'ISc... Remove this comment to see the full error message
            const month = scope.$parent.accountCtrl.manager.getMonth(date || new Date());

            const categoryCache = month.categoryCache[categoryId];

            if (categoryCache) {
              return month.categoryCache[categoryId].balance;
            }

            return 0;
          };

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSubmit' does not exist on type 'IScope... Remove this comment to see the full error message
          scope.onSubmit = () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'splitIndex' does not exist on type 'ISco... Remove this comment to see the full error message
            $rootScope.$broadcast('transaction:memo:focus', { index: scope.$parent.splitIndex });
          };

          scope.$on('transaction:category:focus', (e, { index } = {}) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'splitIndex' does not exist on type 'ISco... Remove this comment to see the full error message
            if (index === scope.$parent.splitIndex) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'ngDisabled' does not exist on type 'ISco... Remove this comment to see the full error message
              if (scope.ngDisabled) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSubmit' does not exist on type 'IScope... Remove this comment to see the full error message
                scope.onSubmit();
              } else {
                scope.$broadcast('focus');
              }
            }
          });

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'template' does not exist on type 'IScope... Remove this comment to see the full error message
          scope.template = require('./categorySuggest.html');
        }
      };
    }

  };
});
