// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'teth... Remove this comment to see the full error message
import Drop from 'tether-drop';
import moment from 'moment';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('outflowTip', ($compile, $timeout) => {

  function link(scope: any, element: any, attrs: any) {

    element.on('click', () => {
      scope.transactions = Object.keys(scope.dbCtrl.manager.transactions).map(id => {
        return scope.dbCtrl.manager.transactions[id];
      })
      .filter(trans => {
        return (!trans.splits || !trans.splits.length) && trans.category && trans.category.indexOf(attrs.category) === 0 && moment(trans.month).format('YYYY-MM') + '-01' === scope.month.date;
      });

      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
      const template = require('./outflowTip.html');
      let dropInstance: any;

      // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
      const wrap = angular.element('<div></div>').append(template);
      const content = $compile(wrap)(scope);

      scope.$apply();

      content.on('keypress keydown', (e: any) => {
        if (e.which === 27) {
          dropInstance.close();
        }
      });

      dropInstance = new Drop({
        target: element[0],
        content: content[0],
        classes: 'drop-theme-arrows-bounce',
        openOn: 'click',
        constrainToScrollParent: attrs.constrainToScrollParent != null,
        position: attrs.position || 'bottom center'
      });

      dropInstance.open();

      dropInstance.on('close', () => {
        $timeout(() => {
          dropInstance.destroy();
        });
      });

    });
  }

  return {
    restrict: 'A',
    link
  };
});
