angular.module('financier').factory('User', ($http: any) => {
  return {
    create: (email: any, password: any) => {
      return $http.post('/manage/users', {
        email: email.toLowerCase(),
        password
      })
      .then((d: any) => d.data);
    },
    login: (email: any, password: any) => {
      return $http.post('/db/_session', {
        name: email.toLowerCase(),
        password
      })
      .then((d: any) => d.data);
    },
    logout: () => {
      return $http.delete('/db/_session')
      .then((d: any) => d.data);
    },
    session: () => {
      return $http.get('/db/_session')
      .then((d: any) => d.data);
    },
    addSource: (token: any) => {
      return $http.post('/manage/billing/source', { token })
      .then((d: any) => d.data);
    },
    getSource: () => {
      return $http.get('/manage/billing/source')
      .then((d: any) => d.data);
    },
    removeSource: () => {
      return $http.delete('/manage/billing/source')
      .then((d: any) => d.data);
    },
    startSubscription: () => {
      return $http.post('/manage/billing/subscription')
      .then((d: any) => d.data);
    },
    stopSubscription: () => {
      return $http.delete('/manage/billing/subscription')
      .then((d: any) => d.data);
    },
    getSubscription: () => {
      return $http.get('/manage/billing/subscription')
      .then((d: any) => d.data);
    },
    getStripePublishableKey: () => {
      return $http.get('/manage/billing/stripeKey')
      .then((d: any) => d.data);
    },
    verifyEmail: (token: any) => {
      return $http.post('/manage/users/verify', { token })
      .then((d: any) => d.data);
    },
    requestResetPassword: (email: any) => {
      return $http.post('/manage/users/forgot', {
        email: email.toLowerCase()
      })
      .then((d: any) => d.data);
    },
    resetPassword: (token: any, password: any) => {
      return $http.post('/manage/users/forgot/reset', { token, password })
      .then((d: any) => d.data);
    }
  };
});
