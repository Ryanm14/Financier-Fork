angular.module('financier').controller('reportCtrl', function(this: any, $scope) {
  this.transactions = $scope.dbCtrl.manager.allAccounts.transactions;

  this.startDate = -Infinity;
  this.endDate = Infinity;

  // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'startDate' implicitly has an 'any... Remove this comment to see the full error message
  $scope.$watchCollection(() => [this.startDate, this.endDate], ([startDate, endDate]) => {
    // Recalculate charts

    this.transactions = $scope.dbCtrl.manager.allAccounts.transactions.filter((t: any) => {
      return t.date >= startDate && t.date <= endDate;
    });
  });
});
