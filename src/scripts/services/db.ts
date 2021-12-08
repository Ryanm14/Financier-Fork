// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'pouc... Remove this comment to see the full error message
import PouchDB from 'pouchdb';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').provider('db', function(this: any) {
  const that = this;

  that.adapter = null;

  this.$get = (Budget: any, BudgetOpened: any, budgetManager: any, $http: any, $rootScope: any) => {
    let db: any, sync: any, changes: any;

    create();

    return {
      budget,
      budgets: budgets(),
      budgetsOpened: budgetsOpened(),
      get _pouch() {
        return db;
      },
      destroy,
      sync: {
        start: startSync,
        cancel: cancelSync
      }
    };

    function cancelSync() {
      if (sync) {
        sync.cancel();
      }

      if (changes) {
        changes.cancel();
      }
    }

    function startSync(dbName: any, isValidSub: any) {
      const options = {
        live: true,
        retry: true,
        batch_size: 500,
        auth: {username: 'admin3', password: 'password'}
      };

      cancelSync();

      // const host = window.location.host;
      const dbUrl = 'http://192.168.1.76:5984/fin';
      isValidSub = true;

      if (isValidSub) {
        sync = db.sync(dbUrl, options)
        .on('paused', function () {
          $rootScope.$apply(() => {
            // user went offline
            $rootScope.$broadcast('syncStatus:update', 'complete');
          });
        });
      } else {
        sync = PouchDB.replicate(dbUrl, db, options)
        .on('paused', function () {
          $rootScope.$apply(() => {
            // user went offline
            $rootScope.$broadcast('syncStatus:update', 'subscription_ended');
          });
        });
      }

      sync
      .on('change', () => {
        $rootScope.$broadcast('syncStatus:update', 'syncing');
      })
      .on('active', () => {
        $rootScope.$apply(() => {
          $rootScope.$broadcast('syncStatus:update', 'syncing');
        });
        // replicate resumed (e.g. user went back online)
      })
      .on('denied', () => {
        $rootScope.$apply(() => {
          $rootScope.$broadcast('syncStatus:update', 'error');
          // a document failed to replicate (e.g. due to permissions)
        });
      })
      .on('complete', () => {
        $rootScope.$broadcast('syncStatus:update', 'error');
        // handle complete
      })
      .on('error', (err: any) => {
        $rootScope.$apply(() => {
          console.log('sync error', err);

          $rootScope.$broadcast('syncStatus:update', 'error');
          // handle error
        });
      });

      changes = db.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', (change: any) => {
        // received a change
        $rootScope.$apply(() => {
          $rootScope.$broadcast('pouchdb:change', change);
        });
      }).on('error', (err: any) => {
        // handle errors
        console.log('error subscribing to changes feed', err);
      });
    }

    function destroy() {
      cancelSync();

      return db.destroy()
      .then(create);
    }

    function create() {
      db = new PouchDB('fin', {
        adapter: that.adapter,
        size: 50,
        auto_compaction: true
      });
    }



    function budget(budgetId: any) {

      return budgetManager(db, budgetId);

    }

    function budgets() {
      function put(budget: any) {
        return db.put(budget.toJSON()).then((res: any) => {
          budget._rev = res.rev;
        });
      }

      function get(id: any) {
        return db.get(`${Budget.prefix}${id}`).then((b: any) => {
          const budget = new Budget(b);
          budget.subscribe(put);

          return budget;
        });
      }

      function all() {
        return db.allDocs({
          include_docs: true, /* eslint camelcase:0 */
          startkey: Budget.startKey,
          endkey: Budget.endKey
        }).then((res: any) => {
          const budgets = [];
          for (let i = 0; i < res.rows.length; i++) {
            const budget = new Budget(res.rows[i].doc);
            budget.subscribe(put);

            budgets.push(budget);
          }

          return budgets;
        });
      }

      return {
        all,
        put,
        get
      };
    }

    function budgetsOpened() {
      function put(budgetOpened: any) {
        return db.put(budgetOpened.toJSON()).then((res: any) => {
          budgetOpened._rev = res.rev;
        });
      }

      function get(id: any) {
        return db.get(`${BudgetOpened.prefix}${id}`).then((b: any) => {
          const budgetOpened = new BudgetOpened(b);
          budgetOpened.subscribe(put);

          return budgetOpened;
        });
      }

      function all() {
        return db.allDocs({
          include_docs: true, /* eslint camelcase:0 */
          startkey: BudgetOpened.startKey,
          endkey: BudgetOpened.endKey
        }).then((res: any) => {
          const budgetsOpened = {};

          for (let i = 0; i < res.rows.length; i++) {
            const budgetOpened = new BudgetOpened(res.rows[i].doc);
            budgetOpened.subscribe(put);

            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            budgetsOpened[budgetOpened.id] = budgetOpened;
          }


          return budgetsOpened;
        });
      }

      return {
        all,
        put,
        get
      };
    }

  };
});
