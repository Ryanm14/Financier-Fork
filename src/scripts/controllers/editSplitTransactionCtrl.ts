angular.module('financier').controller('editSplitTransactionCtrl', function(this: any, $scope) {
  $scope.$watchCollection(() => {
    const amount = ($scope.transactionCtrl.value.value || 0) - $scope.transactionCtrl.splits.reduce((prev: any, current: any) => {
      return prev + (current.value.value || 0);
    }, 0);

    let inflow = 0, outflow = 0;

    if (amount < 0) {
      outflow = Math.abs(amount);
    } else {
      inflow = amount;
    }

    return [inflow, outflow];
  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'inflow' implicitly has an 'any' t... Remove this comment to see the full error message
  }, ([inflow, outflow]) => {
    this.inflow = inflow;
    this.outflow = outflow;
  });
});
