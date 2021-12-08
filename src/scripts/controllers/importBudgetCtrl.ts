angular.module('financier').controller('importBudgetCtrl', function(this: any, $rootScope, $scope, backup) {
  this.submit = (file: any) => {
    this.loading = true;
    this.error = null;

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (() => {
      return (e: any) => {
        let docs;

        try {
          docs = JSON.parse(e.target.result);
        } catch (e) {
          this.error = e;
          throw e; // rethrow for debugging
        }

        backup.restore(docs)
        .then(() => {
          $scope.closeThisDialog();

          $rootScope.$broadcast('reset');
        })
        .catch((e: any) => {
          this.error = e;
        });
      };
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    })(file);

    // Read in the image file as a data URL.
    reader.readAsText(file);
  };

});
