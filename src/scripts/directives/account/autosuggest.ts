angular.module('financier').directive('autosuggest', ($timeout, $filter, inputDropSetup) => {
  return {
    restrict: 'E',
    require: 'ngModel',
    scope: {
      items: '=',
      focus: '@',
      template: '=',
      onSubmit: '&',
      customFilter: '&?',
      ngDisabled: '=',
      canSubmitNew: '@'
    },
    template: `<div class="autosuggest">
                 <div class="autosuggest__text">{{autosuggestText}}</div>
                 <input type="text" ng-model="userInput" ng-disabled="ngDisabled" class="autosuggest__input">
               </div>`,
    link: (scope, element, attrs, ngModelCtrl) => {
      const ngFilter = $filter('filter');
      const input = element.find('input');
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'submit' does not exist on type 'IScope'.
      scope.submit = submit;

      let pristineInputField = true;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
      let items = scope.items;

      const onClosed = () => {
        pristineInputField = true;

        runFilter();

        scope.$digest();
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'template' does not exist on type 'IScope... Remove this comment to see the full error message
      const dropSetup = inputDropSetup(scope, input, scope.template, onClosed);

      scope.$on('focus', () => {
        dropSetup.focus();
      });

      scope.$on('$destroy', () => {
        dropSetup.destroy();
      });

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'filterCustomFilterer' does not exist on ... Remove this comment to see the full error message
      scope.filterCustomFilterer = (item: any) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'customFilter' does not exist on type 'IS... Remove this comment to see the full error message
        if (!scope.customFilter) {
          return () => true;
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'customFilter' does not exist on type 'IS... Remove this comment to see the full error message
        return scope.customFilter({
          item,
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'userInput' does not exist on type 'IScop... Remove this comment to see the full error message
          searchValue: scope.userInput || '',
          pristineInputField
        });
      };

      const runFilter = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
        scope.items = ngFilter(items, scope.filterCustomFilterer);
      };

      scope.$on('autosuggest:filter', runFilter);

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      ngModelCtrl.$render = () => {
        for (let i = 0; i < items.length; i++) {
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          if (items[i] === ngModelCtrl.$modelValue) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'userInput' does not exist on type 'IScop... Remove this comment to see the full error message
            scope.userInput = items[i].name;
          }
        }
      };

      // If you change date ('Income for July' => 'Income to August')
      scope.$on('autosuggest:updateText', () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'userInput' does not exist on type 'IScop... Remove this comment to see the full error message
          scope.userInput = scope.selected.name;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'autosuggestText' does not exist on type ... Remove this comment to see the full error message
          scope.autosuggestText = scope.selected.name;
      });

      scope.$watch('userInput', (userInput, oldUserInput) => {
        if (userInput !== oldUserInput) {
          pristineInputField = false;
        }

        userInput = userInput || '';

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
        scope.selected = null;

        runFilter();

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
        for (let i = 0; i < scope.items.length; i++) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          if (scope.items[i].name.toLowerCase().indexOf(userInput.toLowerCase()) === 0) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
            scope.selected = scope.items[i];
            break;
          }
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canSubmitNew' does not exist on type 'IS... Remove this comment to see the full error message
        if (scope.canSubmitNew && userInput !== oldUserInput) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
          if (scope.selected && scope.selected.name === userInput) {
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            ngModelCtrl.$setViewValue(scope.selected);
          } else {
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            ngModelCtrl.$setViewValue(userInput);
          }
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
        if (scope.selected) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'autosuggestText' does not exist on type ... Remove this comment to see the full error message
          scope.autosuggestText = userInput + scope.selected.name.slice(userInput.length);
        } else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
          scope.selected = scope.items[0];
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'autosuggestText' does not exist on type ... Remove this comment to see the full error message
          scope.autosuggestText = '';
        }

        $timeout(dropSetup.position);
      });

      input.on('keydown', e => {
        if (e.which === 9) { // tab

          dropSetup.close();

        } else if (e.which === 13) { // enter
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
          if (scope.selected) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
            submit(scope.selected);

            dropSetup.close();
          }
        } else if (e.which === 40) { // down

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          const currentIndex = scope.items.indexOf(scope.selected);
          if (currentIndex === -1) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
            scope.selected = scope.items[0];
            // scope.userInput = scope.items[0].name;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          } else if (currentIndex + 1 < scope.items.length) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
            scope.selected = scope.items[currentIndex + 1];
            // scope.userInput = scope.selected.name;
          }

          e.preventDefault();

        } else if (e.which === 38) { // up

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'IScope'.
          const currentIndex = scope.items.indexOf(scope.selected);
          if (currentIndex === -1) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
            scope.selected = scope.items[0];
            // scope.userInput = scope.items[0].name;
          } else if (currentIndex - 1 >= 0) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
            scope.selected = scope.items[currentIndex - 1];
            // scope.userInput = scope.selected.name;
          }

          e.preventDefault();

        }

        scope.$apply();
      });

      function submit(value: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selected' does not exist on type 'IScope... Remove this comment to see the full error message
        scope.selected = value;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'userInput' does not exist on type 'IScop... Remove this comment to see the full error message
        scope.userInput = value.name;

        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        ngModelCtrl.$setViewValue(value);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onSubmit' does not exist on type 'IScope... Remove this comment to see the full error message
        scope.onSubmit();

        dropSetup.close();
      }
    }
  };
});
