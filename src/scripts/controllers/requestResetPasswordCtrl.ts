angular.module('financier').controller('requestResetPasswordCtrl', function(this: any, $scope, User, userEmail) {
  this.email = userEmail;

  this.submit = (email: any) => {
    this.loading = true;
    this.formDisabled = true;

    User.requestResetPassword(email)
    .then(() => {
      this.success = true;
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.activeElement.blur();
    })
    .catch((e: any) => {
      this.error = e;
    })
    .finally(() => {
      this.loading = false;
    });
  };

  $scope.$watch(() => this.email, () => {
    this.formDisabled = false;

    if (this.form) {
      this.form.$setValidity('internalError', true);
    }
  });
});
