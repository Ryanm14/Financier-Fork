// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'angu... Remove this comment to see the full error message
import uiRouter from 'angular-ui-router';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'angu... Remove this comment to see the full error message
import ngAnimate from 'angular-animate';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'angu... Remove this comment to see the full error message
import ngMessages from 'angular-messages';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'angu... Remove this comment to see the full error message
import ngSanitize from 'angular-sanitize';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ng-d... Remove this comment to see the full error message
import ngDialog from 'ng-dialog';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'angu... Remove this comment to see the full error message
import ngMd5 from 'angular-md5';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'angu... Remove this comment to see the full error message
import smartTable from 'angular-smart-table';
import 'st-multi-sort';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'angu... Remove this comment to see the full error message
import ngTranslate from 'angular-translate';
import dynamicLocale from 'angular-dynamic-locale';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'angu... Remove this comment to see the full error message
import vsRepeat from 'angular-vs-repeat';
import 'angular-dateParser/dist/angular-dateparser';
import 'angular-resizable';
import 'angular-hotkeys-light';
import 'angular-hotkeys';
import 'angular-legacy-sortablejs-maintained';
import 'angular-ladda-lw/dist/angular-ladda-lw';
import 'angular-clipboard/angular-clipboard.js';

import moment from 'moment';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
let financier = angular.module('financier', [
  uiRouter,
  ngAnimate,
  ngMessages,
  ngSanitize,
  ngDialog,
  ngMd5,
  smartTable,
  ngTranslate,
  dynamicLocale,
  vsRepeat,
  'ngLocale',
  'dateParser',
  'angularResizable',
  'fps.hotkeys',
  'ng-sortable',
  'angular-ladda-lw',
  'angular-clipboard'
]).run((offline: any, $rootScope: any, $timeout: any, $filter: any, $state: any) => {
  const dateFilter = $filter('date');

  offline.install();

  $rootScope.$on('offlineStatus', (e: any, status: any) => {
    $timeout(() => {
      $rootScope._offlineStatus = status;
    });
  });

  $rootScope.$on('$stateChangeStart', function (evt: any, to: any, params: any) {
    if (to.redirectToReport) {
      evt.preventDefault();
      $state.go(`user.app.manager.view.reports.${$rootScope.lastOpenedReport || 'netWorth'}`, params);
    }
  });

  $rootScope.$on('$stateChangeError', () => {
    console.log('$stateChangeError - fired when an error occurs during transition.');
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'arguments'.
    console.log(arguments);
  });

  $rootScope.version = {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'VERSION'.
    number: VERSION.number,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'VERSION'.
    date: dateFilter(moment(VERSION.date).toDate(), 'mediumDate')
  };
});

financier.config(function (
  $compileProvider: any,
  $stateProvider: any,
  $urlRouterProvider: any,
  $injector: any,
  $locationProvider: any,
  ngDialogProvider: any,
  $translateProvider: any) {
  $compileProvider.debugInfoEnabled(false);
  $compileProvider.commentDirectivesEnabled(false);
  $compileProvider.cssClassDirectivesEnabled(false);

  // For any unmatched url, redirect to /state1
  // $urlRouterProvider.otherwise('/state1');
  //
  // Now set up the states
  $stateProvider
  .state('user', {
    abstract: true,
    template: '<div ui-view class="full-height view-transition__fade"></div>',
    controller: 'userCtrl as userCtrl'
  })
  .state('user.verifyEmail', {
    url: '/user/verify?token',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/verifyEmail.html'),
    controller: 'verifyEmailCtrl as verifyEmailCtrl'
  })
  .state('user.resetPassword', {
    url: '/user/forgot?token&email',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/resetPassword.html'),
    controller: 'resetPasswordCtrl as resetPasswordCtrl'
  })
  .state('user.signup', {
    url: '/signup',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/signup.html'),
    controller: 'signupCtrl as signupCtrl'
  })
  .state('user.budget', {
    url: '/',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/budgets.html'),
    controller: 'budgetsCtrl as budgetsCtrl',
    resolve: {
      myBudgets: function (db: any) {
        return db.budgets.all();
      },
      myBudgetsOpened: function (db: any) {
        return db.budgetsOpened.all();
      }
    }
  })
  .state('user.budget.create', {
    url: 'create-budget',
    onEnter: function (ngDialog: any, $state: any) {
      ngDialog.open({
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        template: require('../views/modal/createBudget.html'),
        controller: 'createBudgetCtrl',
        controllerAs: 'createBudgetCtrl'
      }).closePromise.then(({
        value
      }: any) => {
        if (value && value.indexOf('$') === 0) { // internal ngDialog close event
          $state.go('^');
        }
      });
    },
    onExit: (ngDialog: any) => {
      ngDialog.closeAll();
    }
  })
  .state('user.budget.import', {
    url: 'import-budget',
    onEnter: function (ngDialog: any, $state: any) {
      ngDialog.open({
        // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
        template: require('../views/modal/importBudget.html'),
        controller: 'importBudgetCtrl',
        controllerAs: 'importBudgetCtrl'
      }).closePromise.then(({
        value
      }: any) => {
        if (value && value.indexOf('$') === 0) { // internal ngDialog close event
          $state.go('^');
        }
      });
    },
    onExit: (ngDialog: any) => {
      ngDialog.closeAll();
    }
  })
  .state('user.app', {
    url: '/:budgetId',
    abstract: true,
    template: '<ui-view></ui-view>',
    resolve: {
      myBudget: function (db: any, $stateParams: any) {
        return db.budget($stateParams.budgetId);
      },
      budgetRecord: function (db: any, $stateParams: any, $state: any) {
        return db.budgets.get($stateParams.budgetId)
        .catch((e: any) => {
          if (e.status === 404) {
            return $state.go('404');
          }

          throw e;
        });
      },
      budgetOpenedRecord: function (db: any, $stateParams: any, $state: any) {
        return db.budgetsOpened.get($stateParams.budgetId)
        .catch((e: any) => {
          if (e.status === 404) {
            return $state.go('404');
          }

          throw e;
        });
      }
    },
    onEnter: ($rootScope: any, budgetRecord: any) => {
      $rootScope.appTitle = `${budgetRecord.name} - Financier`;
    },
    onExit: ($rootScope: any) => {
      $rootScope.appTitle = 'Financier';
    }
  })
  .state('user.app.manager', {
    abstract: true,
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/appView.html'),
    controller: 'dbCtrl as dbCtrl',
    resolve: {
      data: function (myBudget: any, $q: any) {
        return $q.all([
          myBudget.budget(),
          myBudget.categories.all(),
          myBudget.masterCategories.all(),
          myBudget.payees.all()
        ])
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'manager' implicitly has an 'any' ... Remove this comment to see the full error message
        .then(([manager, categories, masterCategories, payees]) => {
          manager.propagateRolling(Object.keys(categories));

          return {manager, categories, masterCategories, payees};
        })
        .catch((e: any) => {
          throw e;
        });
      }
    }
  })
  .state('user.app.manager.view', {
    abstract: true,
    template: '<ui-view state-class class="view-transition"></ui-view>',
    onEnter: () => {
      // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
      angular.element(document.body).addClass('no-overflow');
    },
    onExit: () => {
      // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
      angular.element(document.body).removeClass('no-overflow');
    }
  })
  .state('user.app.manager.view.mobileTransaction', {
    url: '/mobile-add',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/mobileTransaction.html')
  })
  .state('user.app.manager.view.budget', {
    url: '/budget',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/budget.html'),
    controller: 'budgetCtrl as budgetCtrl'
  })
  .state('user.app.manager.view.account', {
    url: '/account/:accountId',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/account.html'),
    controller: 'accountCtrl as accountCtrl'
  })
  .state('user.app.manager.view.reports', {
    url: '/reports',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/reports.html'),
    controller: 'reportCtrl as reportCtrl',
    redirectToReport: true
  })
  .state('user.app.manager.view.reports.heatMap', {
    url: '/heat-map',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/reports/heatMap.html'),
    controller: 'heatMapCtrl as heatMapCtrl',
    onEnter: ($rootScope: any) => {
      $rootScope.lastOpenedReport = 'heatMap';
    }
  })
  .state('user.app.manager.view.reports.netWorth', {
    url: '/net-worth',
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/reports/netWorth.html'),
    onEnter: ($rootScope: any) => {
      $rootScope.lastOpenedReport = 'netWorth';
    }
  })
  .state('404', {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    template: require('../views/404.html'),
    controller: ($rootScope: any) => {
      $rootScope.loaded = true;
    }
  });

  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  $translateProvider.translations('en', require('../public/assets/translations/en.json'));
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  $translateProvider.translations('es', require('../public/assets/translations/es.json'));
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  $translateProvider.translations('ru', require('../public/assets/translations/ru.json'));
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  $translateProvider.translations('ca', require('../public/assets/translations/ca.json'));
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  $translateProvider.translations('de', require('../public/assets/translations/de.json'));
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  $translateProvider.translations('no', require('../public/assets/translations/no.json'));
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  $translateProvider.translations('fr', require('../public/assets/translations/fr.json'));

  $translateProvider.registerAvailableLanguageKeys(['en', 'es', 'ru', 'ca', 'de', 'no', 'fr'], {
    'en*': 'en',
    'es*': 'es',
    'ru*': 'ru',
    'ca*': 'ca',
    'de*': 'de',
    'no*': 'no',
    'nn*': 'no', // (alt) Norwegian Nynorsk
    'nb*': 'no', // (alt) Norwegian Bokmål
    'fr*': 'fr',
    '*': 'en' // (fallback)
  })
  .determinePreferredLanguage();

  $translateProvider.useSanitizeValueStrategy(null); // angular-translate's sanitization is broke as fuck

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise(function ($injector: any, $location: any) {
     const state = $injector.get('$state');
     state.go('404');
     return $location.path();
  });

  ngDialogProvider.setDefaults({
    className: 'ngdialog-theme-default modal',
    plain: true
  });
});

financier.run(function ($translate: any, tmhDynamicLocale: any, tmhDynamicLocaleCache: any) {
  function getInjectedLocale() {
    // @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
    var localInjector = angular.injector(['ngLocale']);
    return localInjector.get('$locale');
  }

  // put de-de language into cache
  let language: any;

  if (window.navigator.languages && window.navigator.languages.length) {
    language = window.navigator.languages[0].toLowerCase();
  } else {
    language = window.navigator.language.toLowerCase();
  }

  if (language === 'es-xl') {
    language = 'es-419';
  }

  try {
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    require(`bundle-loader?lazy&name=i18n!angular-i18n/angular-locale_${language}.js`)(function () {
      tmhDynamicLocaleCache.put(language, getInjectedLocale());

      tmhDynamicLocale.set(language);

    });
  } catch (e) {
    console.log(`Couldn't find locale "${language}", falling back to en-us`);

    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    require('bundle-loader?lazy&name=i18n!angular-i18n/angular-locale_en-us.js')(function () {
      tmhDynamicLocaleCache.put('en-us', getInjectedLocale());

      tmhDynamicLocale.set('en-us');
    });
  }
});
