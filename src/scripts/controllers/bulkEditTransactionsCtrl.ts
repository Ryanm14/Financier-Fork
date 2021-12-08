angular.module('financier').controller('bulkEditTransactionsCtrl', function(this: any, $rootScope, $scope, ngDialog) {
  this.removeAll = (transactions: any, event: any) => {
    $scope.stopPropagation(event);

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].transfer && transactions[i].transfer.constructorName === 'SplitTransaction') {
        return ngDialog.open({
          // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
          template: require('../../views/modal/noDeleteSplitTransfer.html'),
          controller: 'cancelClickCtrl'
        });
      }
    }

    const reconciled = transactions.reduce((prev: any, curr: any) => {
      return prev + (curr.reconciled ? 1 : 0);
    }, 0);

    if (reconciled) {
      const scope = $rootScope.$new({});
      scope.reconciled = reconciled;
      scope.length = transactions.length;
      scope.stopPropagation = $scope.stopPropagation;

      ngDialog.openConfirm({
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        template: require('../../views/modal/removeTransactionsConfirm.html'),
        scope,
        className: 'ngdialog-theme-default ngdialog-theme-default--danger modal'
      })
      .then(remove);
    } else {
      remove();
    }

    function remove() {
      transactions.forEach((transaction: any) => {
        $scope.manager.removeTransaction(transaction);
        
        if (transaction.payee) {
          removePayee(transaction);
        }

        transaction.remove();
      });

      $scope.close();
      $rootScope.$broadcast('account:deselectTransactions');
    }
  };

  function removePayee(transaction: any) {
    const transactions = Object.keys($scope.manager.transactions).map(k => $scope.manager.transactions[k]);

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].payee === transaction.payee &&
          transactions[i] !== transaction) {
        return;
      }
    }

    if ($scope.payees[transaction.payee] && !$scope.payees[transaction.payee].internal) {
      $scope.payees[transaction.payee].remove();
      delete $scope.payees[transaction.payee];
    }
  }
});
