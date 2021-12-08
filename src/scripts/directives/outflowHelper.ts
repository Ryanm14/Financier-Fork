// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('outflowHelper', ($compile, $timeout) => {

  function link(scope: any, element: any) {

    element.on('click', () => {
      if (scope.outflowSetting && !scope.disabled) {

        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        const template = require('./outflowHelper.html');
        let dropInstance: any;

        // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
        const wrap = angular.element('<div class="tooltip"></div>').append(template);
        const content = $compile(wrap)(scope);

        content.on('keypress keydown', (e: any) => {
          if (e.which === 27) {
            dropInstance.close();
          }
        });

        dropInstance = new Drop({
          target: element[0],
          content: content[0],
          classes: 'drop-theme-arrows-bounce',
          openOn: 'click',
          position: 'bottom center'
        });

        dropInstance.open();

        dropInstance.on('close', () => {
          $timeout(() => {
            dropInstance.destroy();
          });
        });
      }

    });
  }

  return {
    restrict: 'A',
    scope: {
      outflowDate: '=',
      outflowCategory: '=',
      outflowSetting: '=',
      disabled: '='
    },
    link
  };
});
