// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('logout', ($compile, $timeout) => {
  return {
    restrict: 'A',
    controller: function ($scope, $element, $attrs) {
      $element.on('click', () => {

        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        const template = require('./logout.html');
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
          position: $attrs.position || 'top center'
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
    controllerAs: 'logoutCtrl',
    bindToController: {
      logout: '&',
      logoutAndRemove: '&'
    }
  };
});
