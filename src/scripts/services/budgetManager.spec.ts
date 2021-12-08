// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('budgetManager', function () {
  let db: any, budgetManager: any, month, account, Month: any, Account: any;

  // a random budget uuid to test with
  const UUID = '555-555-555-555';

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier', (dbProvider: any) => {
    dbProvider.adapter = 'memory';
  }));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_db_: any, _budgetManager_: any, _month_: any, _account_: any) => {
    db = _db_;
    budgetManager = _budgetManager_;
    month = _month_;
    account = _account_;

    Month = month(UUID);
    Account = account(UUID);
  }));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'afterEach'.
  afterEach(() => {
    return db._pouch.destroy();
  });


  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should return a function', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(typeof budgetManager).toBe('function');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('budget', () => {
    let budget: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      budget = budgetManager(db._pouch, UUID);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return an object', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(typeof budget).toBe('object');
    });
    
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('all', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return with Months', () => {
        return db._pouch.bulkDocs([{
          _id: 'b_555-555-555-555_month_' + Month.createID(new Date('1/1/15'))
        }, {
          _id: 'b_555-555-555-555_month_' + Month.createID(new Date('2/1/15'))
        }, {
          _id: 'b_555-555-555-555_month_' + Month.createID(new Date('3/1/15'))
        }]).then(() => {
          return budget.budget().then((monthManager: any) => {
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
            expect(monthManager.months.length).toBe(3);

            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
            expect(monthManager.months[0].constructor.name).toBe('Month');
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
            expect(monthManager.months[1].constructor.name).toBe('Month');
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
            expect(monthManager.months[2].constructor.name).toBe('Month');
          });
        });
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update database', () => {
        return db._pouch.bulkDocs([{
          _id: 'b_555-555-555-555_month_' + Month.createID(new Date('1/1/15'))
        }, {
          _id: 'b_555-555-555-555_month_' + Month.createID(new Date('2/1/15'))
        }, {
          _id: 'b_555-555-555-555_month_' + Month.createID(new Date('3/1/15'))
        }]).then(() => {
          return budget.budget().then((monthManager: any) => {
            monthManager.months[0].setBudget('123', 323);

            return db._pouch.get(`b_${UUID}_m_category_${monthManager.months[0].date}_123`)
            .then((item: any) => {
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
              expect(item.budget).toBe(323);
            });
          });
        });
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('put', () => {
        return budget.put(new Account({
          name: 'myNewAccount',
          type: 'CREDIT'
        })).then(() => {
          return budget.accounts.all().then((accounts: any) => {
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
            expect(accounts[0].name).toBe('myNewAccount');
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
            expect(accounts[0].type).toBe('CREDIT');
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
            expect(accounts[0].data._id).toBeDefined();
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
            expect(accounts[0].data._id.indexOf('b_555-555-555-555_account_')).toBe(0);
          });
        });
      });
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('accounts', () => {
    let budget: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      budget = budgetManager(db._pouch, UUID);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should get all that exist', () => {
      return db._pouch.bulkDocs([{
        _id: 'b_555-555-555-555_account_foo',
        name: 'foobar',
        type: 'CREDIT'
      }]).then(() => {
        return budget.accounts.all().then((accounts: any) => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(accounts.length).toBe(1);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(accounts[0].constructor.name).toBe('Account');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(accounts[0].data._id).toBe('b_555-555-555-555_account_foo');
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(accounts[0].name).toBe('foobar');
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(accounts[0].type).toBe('CREDIT');
        });
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should update database on name change', () => {
      db._pouch.bulkDocs([{
        _id: 'b_555-555-555-555_account_foo',
        name: 'foobar',
        type: 'CREDIT'
      }]).then(() => {
        return budget.accounts.all().then((accounts: any) => {

          accounts[0].name = 'mynewname';

          return db._pouch.get('b_555-555-555-555_account_foo').then((r: any) => {
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
            expect(r.name).toBe('mynewname');
          });

        });
      });
    });

  });

  // describe('categories', () => {

  //   it('should get all that exist', (done) => {
  //     db._pouch.bulkDocs([{
  //       _id: 'category_foo',
  //       name: 'foobar',
  //       type: 'CREDIT'
  //     }]).then(res => {
  //       budget.accounts.all().then(accounts => {
  //         expect(accounts.length).toBe(1);

  //         expect(accounts[0].constructor.name).toBe('Account');

  //         expect(accounts[0].data._id).toBe('account_foo');
  //         expect(accounts[0].name).toBe('foobar');
  //         expect(accounts[0].type).toBe('CREDIT');

  //         done();
  //       });
  //     });
  //   });

  //   it('should update database on type change', (done) => {
  //     db._pouch.bulkDocs([{
  //       _id: 'account_foo',
  //       name: 'foobar',
  //       type: 'CREDIT'
  //     }]).then(res => {
  //       budget.accounts.all().then(accounts => {

  //         accounts[0].type = 'DEBIT';

  //         db._pouch.get('account_foo').then(r => {
  //           expect(r.type).toBe('DEBIT');

  //           done();
  //         });

  //       });
  //     });
  //   });

  //   it('should update database on name change', (done) => {
  //     db._pouch.bulkDocs([{
  //       _id: 'account_foo',
  //       name: 'foobar',
  //       type: 'CREDIT'
  //     }]).then(res => {
  //       budget.accounts.all().then(accounts => {

  //         accounts[0].name = 'mynewname';

  //         db._pouch.get('account_foo').then(r => {
  //           expect(r.name).toBe('mynewname');

  //           done();
  //         });

  //       });
  //     });
  //   });

  //   it('put', done => {
  //     budget.accounts.put(new Account({
  //       name: 'myNewAccount',
  //       type: 'CREDIT'
  //     })).then(() => {
  //       budget.accounts.all().then(accounts => {
  //         expect(accounts[0].name).toBe('myNewAccount');
  //         expect(accounts[0].type).toBe('CREDIT');
  //         expect(accounts[0].data._id).toBeDefined();
  //         expect(accounts[0].data._id.indexOf('account_')).toBe(0);

  //         done();
  //       });
  //     });
  //   });

  // });



  // it('propagateRolling should call startRolling on first Month', (done) => {
  //   budget.budget.getFourMonthsFrom(new Date('3/1/15')).then(months => {
  //     budgetManager.categories.then(categories => {
  //       spyOn(months[0], 'startRolling').and.callThrough();

  //       bdg.propagateRolling(categories, months[0]);

  //       for (var i = 0; i < categories.length; i++) {
  //         expect(months[0].startRolling).toHaveBeenCalledWith(categories[i]._id);
  //       }

  //       done();
  //     });
  //   });
  // });
});
