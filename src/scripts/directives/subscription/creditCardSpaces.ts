angular.module('financier').directive('creditCardSpaces', () => {
  return {
    restrict: 'A',
    scope: {
      creditCardSpaces: '=',
      cardChanged: '='
    },
    link: (scope, element) => {
      element.on('input', function(this: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cardChanged' does not exist on type 'ISc... Remove this comment to see the full error message
        scope.cardChanged = true;

        var newValue = this.value.split(' ').join('');

        if (newValue.length > 0) {
          newValue = newValue.match(new RegExp('.{1,4}', 'g')).join(' ');
        }

        this.value = newValue;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'creditCardSpaces' does not exist on type... Remove this comment to see the full error message
        scope.creditCardSpaces = this.value;
      });

      element.on('blur', () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cardChanged' does not exist on type 'ISc... Remove this comment to see the full error message
        scope.cardChanged = true;
      });
    }
  };
});
