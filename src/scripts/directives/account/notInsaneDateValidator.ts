angular.module('financier').directive('notInsaneDateValidator', () => {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, element, attrs, ngModel) => {
        //For DOM -> model validation
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        ngModel.$validators.notInsaneDate = function (value: any) {
          return value.getFullYear() >= 1970;
        };
    }
  };
});
