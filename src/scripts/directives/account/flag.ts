// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('flag', $compile => {

  function link(scope: any, element: any, attrs: any, ngModelCtrl: any) {
    let dropInstance: any;
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    const template = require('./flag.html');

    // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
    const wrap = angular.element('<div></div>').append(template);
    const content = $compile(wrap)(scope);

    content.on('keypress keydown', (e: any) => {
      if (e.which === 27) {
        dropInstance.close();
      }
    });

    content.on('click', (event: any) => {
      scope.$parent.dbCtrl.stopPropagation(event);
    });

    dropInstance = new Drop({
      target: element[0],
      content: content[0],
      classes: 'drop-theme-arrows-bounce',
      openOn: 'click',
      constrainToWindow: true,
      constrainToScrollParent: false,
      tetherOptions: {
        targetOffset: '0 -15px',
        optimizations: {
          moveElement: true
        }
      }
    });

    scope.$on('drop:close', () => {
      dropInstance.close();
    });

    dropInstance.on('open', () => {
      scope.flag = ngModelCtrl.$viewValue;
    });

    dropInstance.on('close', () => {
      scope.flag = ngModelCtrl.$viewValue;
    });

    scope.$on('$destroy', () => {
      dropInstance.destroy();
    });

    scope.submit = (flag: any) => {
      ngModelCtrl.$setViewValue(flag);

      dropInstance.close();
    };

    element.on('click', (event: any) => {
      scope.$parent.dbCtrl.stopPropagation(event);

      dropInstance.open();
    });

  }

  return {
    restrict: 'A',
    require: 'ngModel',
    controller: 'flagCtrl as flagCtrl',
    link
  };
});
