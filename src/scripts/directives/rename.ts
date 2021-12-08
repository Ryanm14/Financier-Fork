// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('rename', ($compile, $timeout) => {

  function link(scope: any, element: any, attrs: any, ngModelCtrl: any) {
    element.on('click', () => {
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
      const template = require('./rename.html');

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
          targetOffset: '0 -20px',
          targetAttachment: 'bottom center',
          optimizations: {
            moveElement: true
          }
        }
      });

      dropInstance.on('open', () => {
        scope.myNote = ngModelCtrl.$viewValue;

        content.find('input')[0].focus();
      });

      dropInstance.on('close', () => {
        scope.myNote = ngModelCtrl.$viewValue;

        $timeout(() => {
          dropInstance.destroy();
        });
      });

      scope.$on('drop:close', () => {
        dropInstance.close();
      });

      scope.remove = () => {
        dropInstance.close();
        scope.onRemove();
      };

      scope.submit = (rename: any) => {
        ngModelCtrl.$setViewValue(rename);

        dropInstance.close();
      };


      dropInstance.open();
    });

  }

  return {
    restrict: 'A',
    require: 'ngModel',
    link,
    scope: {
      onRemove: '&'
    }
  };
});
