angular.module('financier').directive('creditCard', ($q, User, stripeLazyLoader) => {
  return {
    restrict: 'E',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('./creditCard.html'),
    bindToController: {
      addToken: '&'
    },
    controllerAs: 'vm',
    controller: function ($scope) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'card' does not exist on type 'IDirective... Remove this comment to see the full error message
      this.card = {};

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'card' does not exist on type 'IDirective... Remove this comment to see the full error message
      $scope.$watch(() => this.card, () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cardForm' does not exist on type 'IDirec... Remove this comment to see the full error message
        this.cardForm.$setValidity('stripeError', true);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cardForm' does not exist on type 'IDirec... Remove this comment to see the full error message
        this.cardForm.$setValidity('internalError', true);
      }, true);

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'submit' does not exist on type 'IDirecti... Remove this comment to see the full error message
      this.submit = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingAddSource' does not exist on type... Remove this comment to see the full error message
        this.loadingAddSource = true;

        $q.all([
          User.getStripePublishableKey(),
          stripeLazyLoader // we must require stripe by this point
        ])
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'key' implicitly has an 'any' type... Remove this comment to see the full error message
        .then(([key]) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'Stripe' does not exist on type 'Window &... Remove this comment to see the full error message
          window.Stripe.setPublishableKey(key);
        })
        .then(() => {
          return $q((resolve: any, reject: any) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'Stripe' does not exist on type 'Window &... Remove this comment to see the full error message
            window.Stripe.card.createToken(angular.copy(this.card), (status: any, response: any) => {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'stripeError' does not exist on type 'IDi... Remove this comment to see the full error message
              this.stripeError = response.error;
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'cardForm' does not exist on type 'IDirec... Remove this comment to see the full error message
              this.cardForm.$setValidity('stripeError', !this.stripeError);
              
              if (response.error) {
                reject('stripeError');
              } else {
                resolve(response.id);
              }
            });
          });
        })
        .then((token: any) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'addToken' does not exist on type 'IDirec... Remove this comment to see the full error message
          return this.addToken({ token })
          .catch((e: any) => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stripeError' does not exist on type 'IDi... Remove this comment to see the full error message
            this.stripeError = e.data;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'cardForm' does not exist on type 'IDirec... Remove this comment to see the full error message
            this.cardForm.$setValidity('stripeError', !this.stripeError);

            // @ts-expect-error ts-migrate(2339) FIXME: Property 'stripeError' does not exist on type 'IDi... Remove this comment to see the full error message
            if (this.stripeError) {
              throw 'stripeError';
            }

            throw e;
          });
        })
        .then(() => {
          $scope.closeThisDialog();
        })
        .catch((e: any) => {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingAddSource' does not exist on type... Remove this comment to see the full error message
          this.loadingAddSource = false;

          if (e !== 'stripeError') {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'cardForm' does not exist on type 'IDirec... Remove this comment to see the full error message
            this.cardForm.$setValidity('internalError', false);
          }
        });
      };
    }
  };
});

