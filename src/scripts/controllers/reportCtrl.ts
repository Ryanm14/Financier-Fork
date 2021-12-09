class reportCtrl {
  transactions: any;
  startDate: number;
  endDate: number;

  constructor($scope: any) {
    // @ts-ignore
    this.transactions = $scope.dbCtrl.manager.allAccounts.transactions;

    this.startDate = -Infinity;
    this.endDate = Infinity;

    // @ts-ignore
    $scope.$watchCollection(() => [this.startDate, this.endDate], ([startDate, endDate]) => {
      // Recalculate charts

      // @ts-ignore
      this.transactions = $scope.dbCtrl.manager.allAccounts.transactions.filter(t => {
        return t.date >= startDate && t.date <= endDate;
      });
    });
  }
}

angular.module('financier').controller('reportCtrl', reportCtrl);
