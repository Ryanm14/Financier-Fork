// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('addCategory', ($compile, $timeout) => {
  return {
    restrict: 'A',
    scope: {
      addCategory: '&',
      addLabel: '@'
    },
    link(scope, element) {
      element.on('click', () => {
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        const template = require('./addCategory.html');

        // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
        const wrap = angular.element('<div></div>').append(template);
        const content = $compile(wrap)(scope);

        content.on('keypress keydown', (e: any) => {
          if (e.which === 27) {
            dropInstance.close();
          }
        });

        const dropInstance = new Drop({
          target: element[0],
          content: content[0],
          classes: 'drop-theme-arrows-bounce',
          openOn: 'click',
          tetherOptions: {
            targetOffset: '0 -18px',
            optimizations: {
              moveElement: true
            }
          }
        });

        dropInstance.on('open', () => {
          content.find('input')[0].focus();
        });

        dropInstance.on('close', () => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'IScope'.
          scope.name = null;

          $timeout(() => {
            dropInstance.destroy();
          });
        });

        scope.$on('drop:close', () => {
          dropInstance.close();
        });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'submit' does not exist on type 'IScope'.
        scope.submit = (name: any) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'addCategory' does not exist on type 'ISc... Remove this comment to see the full error message
          scope.addCategory({ name });

          dropInstance.close();
        };


        dropInstance.open();
      });
    }
  };
});
