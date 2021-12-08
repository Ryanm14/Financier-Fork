angular.module('financier').directive('calcInput', () => {
  return function (scope, element) {
    element.bind('keypress', event => {
      const charCode = event.which || event.keyCode;
      const charTyped = String.fromCharCode(charCode);

      if (charTyped === '+' || charTyped === '-' || charTyped === '*' || charTyped === '/') {
        const input = element;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'HTMLEleme... Remove this comment to see the full error message
        const length = input[0].value.length;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectionEnd' does not exist on type 'HT... Remove this comment to see the full error message
        if (input[0].selectionEnd === length) {
          input[0].focus();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'setSelectionRange' does not exist on typ... Remove this comment to see the full error message
          input[0].setSelectionRange(length, length);
        }
      }
    });
  };
});
