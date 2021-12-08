angular.module('financier').directive('mobileKeypad', () => {
  return {
    restrict: 'E',
    require: 'ngModel',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('./mobileKeypad.html'),
    replace: true,
    scope: {
      onNext: '&'
    },
    link: (scope, element, attrs, ngModel) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'addNumber' does not exist on type 'IScop... Remove this comment to see the full error message
      scope.addNumber = (num: any) => {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        let val = ngModel.$viewValue;

        val = (val * 10) + num;

        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        ngModel.$setViewValue(val);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'removeNumber' does not exist on type 'IS... Remove this comment to see the full error message
      scope.removeNumber = () => {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        let val = ngModel.$viewValue;
        
        val = Math.floor(val / 10);

        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        ngModel.$setViewValue(val);
      };
    }
  };
});
