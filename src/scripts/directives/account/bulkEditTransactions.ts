// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('bulkEditTransactions', ($rootScope, $sce, $compile, $timeout) => {

  function link(scope: any, element: any) {
    element.on('click', (event: any) => {
      event.stopPropagation();

      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
      const template = require('./bulkEditTransactions.html');

      // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
      const wrap = angular.element('<div></div>').append(template);
      const content = $compile(wrap)(scope);

      content.on('keypress keydown', (e: any) => {
        if (e.which === 27) {
          dropInstance.close();
        }
      });

      let dropInstance = new Drop({
        target: element[0],
        content: content[0],
        classes: 'drop-theme-arrows-bounce',
        openOn: 'click',
        position: 'bottom center',
        constrainToWindow: true,
        constrainToScrollParent: false,
        tetherOptions: {
          targetOffset: '0 -15px',
          optimizations: {
            moveElement: true
          }
        }
      });

      scope.close = () => {
        dropInstance && dropInstance.destroy();
        dropInstance = null;
      };

      $rootScope.$broadcast('drop:close');

      scope.$on('drop:close', () => {
        dropInstance.close();
      });

      scope.$on('$destroy', () => {
        scope.close();
      });

      dropInstance.on('close', () => {
        $timeout(() => {
          dropInstance && dropInstance.destroy();
        });
      });

      dropInstance.open();
    });

  }

  return {
    restrict: 'A',
    controller: 'bulkEditTransactionsCtrl as bulkEditTransactionsCtrl',
    scope: {
      bulkEditTransactions: '=',
      manager: '=',
      payees: '=',
      stopPropagation: '='
    },
    link
  };
});
