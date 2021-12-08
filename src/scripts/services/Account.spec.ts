// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('account', function () {
  let account: any, Account: any, transaction, Transaction: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_account_: any, _transaction_: any) => {
    account = _account_;
    transaction = _transaction_;

    Account = account('111-111-111-111');
    Transaction = transaction('111-111-111-111');
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('new Account()', () => {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('static property', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Account.startKey).toBe('b_111-111-111-111_account_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Account.endKey).toBe('b_111-111-111-111_account_\uffff');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('prefix', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Account.prefix).toBe('b_111-111-111-111_account_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('contains', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is true if _id is of budget and is account', () => {
          const acc = new Account();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Account.contains(acc.data._id)).toBe(true);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of other budget and is account', () => {
          const OtherBudgetAccount = account('222-222-222-222'),
            acc = new OtherBudgetAccount();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Account.contains(acc.data._id)).toBe(false);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of budget and is account', () => {
          const trans = new Transaction();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Account.contains(trans.data._id)).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is greater than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Account.contains('aaa')).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is less than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Account.contains('zzz')).toBe(false);
        });
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take an existing database document', () => {
      let acc = new Account({
        name: 'My account',
        type: 'CREDIT'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.constructor.name).toBe('Account');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take no constructor params', () => {
      let acc = new Account();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.constructor.name).toBe('Account');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('exposes default name and type', () => {
      let acc = new Account();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.type).toBe(null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.data._id).toBeDefined(); // randomly generated if not provided
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.name).toBe(null);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('generates _id if none exists', () => {
      let acc = new Account();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.data._id).toBeDefined();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('uses existing _id if exists', () => {
      let acc = new Account({
        _id: 'myid'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.data._id).toBe('myid');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('prefixes _id properly', () => {
      let acc = new Account();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.data._id.indexOf('b_111-111-111-111_account_')).toEqual(0);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets id properly', () => {
      let acc = new Account({
        _id: 'b_111-111-111-111_account_123-123-123-123'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.id).toBe('123-123-123-123');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('has 0 balance by default', () => {
      const acc = new Account();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.balance).toBe(0);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('can be removed', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let acc = new Account({
        type: 'CREDIT'
      });

      acc.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.toJSON()._deleted).not.toBeDefined();

      acc.remove();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(acc);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.toJSON()._deleted).toBe(true);

  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('set', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('name', () => {
      let acc = new Account({
        name: 'My account'
      });

      acc.name = 'My custom name';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.toJSON().name).toBe('My custom name');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('type', () => {
      let acc = new Account({
        type: 'CREDIT'
      });

      acc.type = 'DEBIT';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.toJSON().type).toBe('DEBIT');
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('pub/sub', () => {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('name', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let acc = new Account({
        name: 'My account'
      });

      acc.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      acc.name = 'My custom name';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(acc);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('type', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let acc = new Account({
        type: 'CREDIT'
      });

      acc.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      acc.type = 'DEBIT';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(acc);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('_changeClearedBalance', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('changes the cleared balance by a given amount', () => {
      const acc = new Account();

      acc._changeClearedBalance(20);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.cache.clearedBalance).toBe(20);

      acc._changeClearedBalance(-35);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.cache.clearedBalance).toBe(-15);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('_changeUnclearedBalance', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('changes the uncleared balance by a given amount', () => {
      const acc = new Account();

      acc._changeUnclearedBalance(20);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.cache.unclearedBalance).toBe(20);

      acc._changeUnclearedBalance(-35);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.cache.unclearedBalance).toBe(-15);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('addTransaction', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('changes the balance correctly when added', () => {
      const acc = new Account(),
        trans = new Transaction({
        value: 123
      });
      acc.addTransaction(trans);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.balance).toBe(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('changes the balance correctly upon future changes', () => {
      const acc = new Account(),
        trans = new Transaction({
        value: 123
      });
      acc.addTransaction(trans);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.balance).toBe(123);

      trans.value = 400;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.balance).toBe(400);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('removeTransaction', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('changes the balance correctly when removed', () => {
      const acc = new Account(),
        trans = new Transaction({
        value: 123
      });

      acc.addTransaction(trans);
      acc.removeTransaction(trans);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(acc.balance).toBe(0);
    });
  });
});
