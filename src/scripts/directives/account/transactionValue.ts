angular.module('financier').directive('transactionValue', ($filter, $locale) => {
  const GROUP_SEP = $locale.NUMBER_FORMATS.GROUP_SEP;
  const DECIMAL_SEP = $locale.NUMBER_FORMATS.DECIMAL_SEP;

  const numberFilter = $filter('number');
  const intCurrencyFilter = $filter('intCurrency');

  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, element, attrs, ngModelCtrl) => {
      //format text going to user (model to view)
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      ngModelCtrl.$formatters.push(function (value: any) {
        if (!value) {
          return null;
        }

        return numberFilter(
          intCurrencyFilter(
            value,
            true,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
            scope.$parent.dbCtrl.currencyDigits
          ),
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
          scope.$parent.dbCtrl.currencyDigits
        );
      });

      //format text from the user (view to model)
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      ngModelCtrl.$parsers.push(function (value: any) {
        if (value === DECIMAL_SEP) {
          return;
        }

        value = value.replace(new RegExp(`\\${GROUP_SEP}`, 'g'), '');
        value = value.replace(new RegExp(`\\${DECIMAL_SEP}`, 'g'), '.');

        const num = +value;

        if (num === 0) {
          return;
        }

        if (isNaN(num)) {
          return 0;
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
        return Math.round(num * Math.pow(10, scope.$parent.dbCtrl.currencyDigits));
      });
    }
  };
});
