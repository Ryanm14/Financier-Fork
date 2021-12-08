import { Parser } from 'expr-eval';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('onUpdate', ($filter, $timeout, $locale) => {
  const GROUP_SEP = $locale.NUMBER_FORMATS.GROUP_SEP;
  const DECIMAL_SEP = $locale.NUMBER_FORMATS.DECIMAL_SEP;

  const numberFilter = $filter('number');
  const intCurrencyFilter = $filter('intCurrency');

  function link(scope: any, element: any, attrs: any) {
    let oldValue;

    scope.$watch('viewModel', (val: any) => {
      if (document.activeElement !== element[0]) {
        setView(val);
      }
    });

    const parse = () => {
      try {
        let v = element.val();
        v = v.replace(new RegExp(`\\${GROUP_SEP}`, 'g'), '');
        v = v.replace(new RegExp(`\\${DECIMAL_SEP}`, 'g'), '.');

        const val = Parser.evaluate(v);
        oldValue = val.toFixed(scope.$parent.dbCtrl.currencyDigits);
      } catch (e) {
        oldValue = attrs.required ? null : 0;
      }

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | number | null' is not a... Remove this comment to see the full error message
      if (!isFinite(oldValue) || isNaN(oldValue)) {
        oldValue = attrs.required ? null : 0;
      }

      if (attrs.required && oldValue == null) {
        return null;
      }

      // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
      const val = Math.round(oldValue * Math.pow(10, scope.$parent.dbCtrl.currencyDigits));

      return val;
    };

    element.on('input', () => {
      validate();
      scope.$apply();
    });

    element.on('keypress blur', (event: any) => {
      if (event.which === 13 || event.type == 'blur') { // enter or blur
        const val = parse();

        scope.onUpdate({
          model: val // float $2.50123 ==> int 250
        });

        // 20.20 => 20.2 goes to 20.20
        setView(val);

        scope.$apply();
      }
    });

    element.on('focus', () => {
      element.one('mouseup', () => {
        element[0].select();

        return false;
      });
    });

    function validate() {
      const isValid = parse() != null;

      scope.onValidate({ isValid });
    }

    function setView(val: any) {
      oldValue = numberFilter(
        intCurrencyFilter(
          val,
          true,
          scope.$parent.dbCtrl.currencyDigits
        ),
        scope.$parent.dbCtrl.currencyDigits
      );

      if (attrs.required || val !== 0) {
        element.val(oldValue);
      } else {
        element.val('');
      }
    }
  }

  return {
    restrict: 'A',
    scope: {
      viewModel: '=',
      onUpdate: '&',
      onValidate: '&'
    },
    link
  };
});
