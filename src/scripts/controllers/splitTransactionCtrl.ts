angular.module('financier').controller('splitTransactionCtrl', function(this: any, $scope) {
  $scope.transactionIndex = $scope.$index;
  $scope.transactionVsIndex = $scope.startIndex;

  $scope.$watch('startIndex', (startIndex: any) => {
    this.vsIndex = startIndex;
  });

  $scope.$watch('$index', ($index: any) => {
    this.index = $index;
  });
});
