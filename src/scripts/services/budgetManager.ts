angular.module('financier').factory('budgetManager', (
  month: any,
  account: any,
  category: any,
  transaction: any,
  masterCategory: any,
  monthManager: any,
  payee: any,
  uuid: any,
  $q: any,
  $translate: any,
  MonthCategory: any,
  defaultCategories: any) => {

  return (pouch: any, budgetId: any) => {
    const Month = month(budgetId);
    const Account = account(budgetId);
    const Category = category(budgetId);
    const Transaction = transaction(budgetId);
    const MasterCategory = masterCategory(budgetId);
    const MonthManager = monthManager(budgetId);
    const Payee = payee(budgetId);

    const ret = {
      accounts: accounts(),
      categories: categories(),
      masterCategories: masterCategories(),
      payees: payees(),
      budget: budget(),
      remove,
      initialize: initializeAllCategories,
      put
    };

    function remove() {
      return pouch.allDocs({
        startkey: `b_${budgetId}_`,
        endkey: `b_${budgetId}_\uffff`,
        include_docs: true
      })
      .then((res: any) => {
        return pouch.bulkDocs(res.rows.map((row: any) => {
          return {
            _id: row.doc._id,
            _rev: row.doc._rev,
            _deleted: true
          };
        }));
      });
    }

    function put(o: any) {
      return pouch.put(o.toJSON()).then((res: any) => {
        o.data._rev = res.rev;
      });
    }

    return ret;


    function accounts() {
      function all() {
        return pouch.allDocs({
          include_docs: true,
          startkey: Account.startKey,
          endkey: Account.endKey
        }).then((res: any) => {
          const accounts = [];

          for (let i = 0; i < res.rows.length; i++) {
            const acc = new Account(res.rows[i].doc);

            accounts.push(acc);
          }

          return accounts;
        });
      }

      function get(accountId: any) {
        return pouch.get(Account.prefix + accountId)
        .then((acc: any) => {
          return new Account(acc);
        });
      }

      return {
        all,
        get
      };
    }

    function masterCategories() {
      function all() {
        return pouch.allDocs({
          include_docs: true,
          startkey: MasterCategory.startKey,
          endkey: MasterCategory.endKey
        }).then((res: any) => {
          const ret = {};

          for (let i = 0; i < res.rows.length; i++) {
            const cat = new MasterCategory(res.rows[i].doc);
            cat.subscribe(put);
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ret[cat.id] = cat;
          }

          return ret;
        });
      }

      return {
        all,
        put
      };
    }

    function categories() {
      function all() {
        return pouch.allDocs({
          include_docs: true,
          startkey: Category.startKey,
          endkey: Category.endKey
        }).then((res: any) => {
          const ret = {};

          for (let i = 0; i < res.rows.length; i++) {
            const cat = new Category(res.rows[i].doc);
            cat.subscribe(put);
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ret[cat.id] = cat;
          }

          return ret;
        });
      }

      return {
        all,
        put
      };
    }

    function payees() {
      function all() {
        return pouch.allDocs({
          include_docs: true,
          startkey: Payee.startKey,
          endkey: Payee.endKey
        }).then((res: any) => {
          const ret = {};

          for (let i = 0; i < res.rows.length; i++) {
            const myPayee = new Payee(res.rows[i].doc);
            myPayee.subscribe(put);
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            ret[myPayee.id] = myPayee;
          }

          return ret;
        });
      }

      return {
        all
      };
    }

    function initializeAllCategories() {
      const promises = [];

      for (let i = 0; i < defaultCategories.length; i++) {
        const masterCat = new MasterCategory({
          name: $translate.instant(defaultCategories[i].name),
          sort: i
        });

        promises.push(pouch.put(masterCat.toJSON()));

        for (let j = 0; j < defaultCategories[i].categories.length; j++) {
          const cat = new Category({
            name: $translate.instant(defaultCategories[i].categories[j].name),
            sort: j,
            masterCategory: masterCat.id
          });

          promises.push(pouch.put(cat.toJSON()));
        }
      }

      return $q.all(promises);
    }

    function budget() {
      function getAllMonthCategories() {
        return pouch.allDocs({
          include_docs: true,
          startkey: MonthCategory.startKey(budgetId),
          endkey: MonthCategory.endKey(budgetId)
        })
        .then((res: any) => {
          return res.rows.map((row: any) => {
            const bValue = new MonthCategory(row.doc);
            bValue.subscribe(put);

            return bValue;
          });
        });
      }

      function getAllAccounts() {
        return pouch.allDocs({
          include_docs: true,
          startkey: Account.startKey,
          endkey: Account.endKey
        })
        .then((res: any) => {
          return res.rows.map((row: any) => {
            const acc = new Account(row.doc);
            acc.subscribe(put);

            return acc;
          });
        });
      }

      function getAllTransactions() {
        return pouch.allDocs({
          include_docs: true,
          startkey: Transaction.startKey,
          endkey: Transaction.endKey
        })
        .then((res: any) => {
          const transactions = {};

          for (let i = 0; i < res.rows.length; i++) {
            const trans = new Transaction(res.rows[i].doc);

            // Add transaction splits
            if (trans.splits.length) {
              for (let j = 0; j < trans.splits.length; j++) {
                // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                transactions[trans.splits[j].id] = trans.splits[j];
              }
            }

            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            transactions[trans.id] = trans;
          }

          return Object.keys(transactions).map(key => {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const trans = transactions[key];

            if (trans.data.transfer) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              trans.transfer = transactions[trans.data.transfer];
            }

            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            return transactions[key];
          });
        });
      }

      function all() {
        return pouch.allDocs({
          include_docs: true, /* eslint camelcase:0 */
          startkey: Month.startKey,
          endkey: Month.endKey
        }).then((res: any) => {
          const months = res.rows.map((row: any) => new Month(row.doc, put));

          const manager = new MonthManager(months, put);

          return getAllMonthCategories()
          .then((monthCatVals: any) => {
            for (let i = 0; i < monthCatVals.length; i++) {
              manager.addMonthCategory(monthCatVals[i]);
            }

            return getAllAccounts()
            .then((accounts: any) => {
              for (let i = 0; i < accounts.length; i++) {
                manager.addAccount(accounts[i]);
              }

              return getAllTransactions()
              .then((transactions: any) => {
                for (let i = 0; i < transactions.length; i++) {
                  manager.addTransaction(transactions[i]);
                }

                return manager;
              });

            });
          });
        });
      }

      return all;
    }
  };


});
