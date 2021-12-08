angular.module('financier').controller('signinCtrl', function(this: any, User, $scope, $rootScope, ngDialog) {
  this.login = (username: any, password: any, closeThisDialog: any) => {
    this.loading = true;
    this.error = null;

    return User.login(username, password)
    .then(() => {
      $rootScope.$broadcast('login');

      closeThisDialog();
    })
    .finally(() => {
      this.loading = false;
    })
    .catch((e: any) => {
      this.error = e.data;
    });
  };

  this.requestResetPassword = () => {
    $scope.closeThisDialog();

    ngDialog.open({
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
      template: require('../../views/modal/requestResetPassword.html'),
      controller: 'requestResetPasswordCtrl as requestResetPasswordCtrl',
      resolve: {
        userEmail: () => this.email
      }
    });
  };

  $scope.$watchGroup([() => this.email, () => this.password], () => {
    if (angular.isDefined(this.email) ||
        angular.isDefined(this.password)) {
      this.form.password.$setValidity('incorrect', true);
    }
  });
});
