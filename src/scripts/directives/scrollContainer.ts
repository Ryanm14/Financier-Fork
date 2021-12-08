angular.module('financier').directive('scrollContainer', () => {
  return {
    restrict: 'A',
    scope: false,
    controller: function ($element) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'element' does not exist on type 'IDirect... Remove this comment to see the full error message
      this.element = $element[0];

      // Needed for scrollIntoViewIf scrollTop calculation
      $element.css('position', 'relative');
    }
  };
});
