angular.module('financier').controller('signupCtrl', function(this: any, $scope, User) {
  this.submit = (email: any, password: any) => {
    this.loading = true;

    User.create(email, password)
    .then(() => {
      this.success = true;
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.activeElement.blur();
    })
    .catch((e: any) => {
      if (e.data.errorMessage === 'existingEmail') {
        this.form.email.$setValidity('duplicate', false);
      } else {
        this.form.$setValidity('internalError', false);
      }
    })
    .finally(() => {
      this.loading = false;
    });
  };

  $scope.$watch(() => this.email, () => {
    this.form.email.$setValidity('duplicate', true);
  });

  $scope.$watch(() => `${this.email}${this.password}`, () => {
    this.form.$setValidity('internalError', true);
  });
});
