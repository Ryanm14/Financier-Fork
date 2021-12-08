// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('transaction', function () {
  let transaction: any, splitTransaction: any, account: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_transaction_: any, _splitTransaction_: any, _account_: any) => {
    transaction = _transaction_;
    splitTransaction = _splitTransaction_;
    account = _account_;
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('is a function', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(typeof transaction).toBe('function');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('static methods', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('123-123-123-123');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('startKey', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Transaction.startKey).toBe('b_123-123-123-123_transaction_');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('startKey', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Transaction.endKey).toBe('b_123-123-123-123_transaction_\uffff');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('prefix', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Transaction.prefix).toBe('b_123-123-123-123_transaction_');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('contains', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is true if _id is of budget and is Transaction', () => {
        const trans = new Transaction();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Transaction.contains(trans.data._id)).toBe(true);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is false if _id is of other budget and is Transaction', () => {
        const OtherBudgetTransaction = transaction('222-222-222-222'),
          trans = new OtherBudgetTransaction();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Transaction.contains(trans.data._id)).toBe(false);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is false if _id is of budget and is Transaction', () => {
        const Account = account('123-123-123-123'),
          acc = new Account();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Transaction.contains(acc.data._id)).toBe(false);
      });

      // Explicit coverage test
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is false if _id is greater than', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Transaction.contains('aaa')).toBe(false);
      });

      // Explicit coverage test
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is false if _id is less than', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Transaction.contains('zzz')).toBe(false);
      });
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('takes a budgetId and returns Transaction', () => {
    const Transaction = transaction('123-123-123-123');
    const tran = new Transaction({
      value: 0
    });

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(tran.constructor.name).toBe('Transaction');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('new transaction()', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take an existing database document', () => {
      let tran = new Transaction({
        value: 123,
        _id: 'b_123-123-123-123_transaction_321-321-321-321'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.constructor.name).toBe('Transaction');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can create default id', () => {
      let tran = new Transaction({
        value: 0
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran._id.indexOf('b_111-111-111-111_transaction_')).toBe(0);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('uses existing _id if exists', () => {
      let tran = new Transaction({
        _id: 'b_123-123-123-123_transaction_321-321-321-321'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran._id).toBe('b_123-123-123-123_transaction_321-321-321-321');
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('date', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can be set', () => {
      const tran = new Transaction();
      const d = new Date('2012-12-12T06:00:00.000Z');

      tran.date = d;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.date).toBe(d);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.data.date).toBe('2012-12-12');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('zeroes out timezone', () => {
      // for backward compatibility when dates were toUTCString()'d instead of 'yyyy-mm-dd'
      const tran = new Transaction({
        date: '2012-12-12T06:00:00.000Z'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.date.toISOString().indexOf('2012-12-12')).toBe(0);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can be set from record', () => {
      const tran = new Transaction({
        date: '2012-12-12T12:00:00.000Z'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(angular.isDate(tran.date)).toBe(true);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.date.toISOString().indexOf('2012-12-12')).toBe(0);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.data.date.indexOf('2012-12-12')).toBe(0);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('inflow', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets value', () => {
      const tran = new Transaction();

      tran.inflow = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.inflow).toBe(123);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.value).toBe(123);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.data.value).toBe(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('is undefined with negative value', () => {
      const tran = new Transaction();

      tran.value = -123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.inflow).toBeUndefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.data.inflow).toBeUndefined();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('calls subscriber', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      const tran = new Transaction();

      tran.subscribeValueChange(foo.change);

      tran.inflow = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(123);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('outflow', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets value', () => {
      const tran = new Transaction();

      tran.outflow = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.outflow).toBe(123);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.value).toBe(-123);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.data.value).toBe(-123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('is undefined with postive value', () => {
      const tran = new Transaction();

      tran.value = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.outflow).toBeUndefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.data.outflow).toBeUndefined();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('calls subscriber', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      const tran = new Transaction();

      tran.subscribeValueChange(foo.change);

      tran.outflow = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(-123);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('can be removed', () => {
      const Transaction = transaction('111-111-111-111');

      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction({
        _id: 'foo'
      });

      tran.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON()._deleted).not.toBeDefined();

      tran.remove();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(tran);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON()._deleted).toBe(true);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('_emitValueChange', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('send a value to the value subscriber', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribeValueChange(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      tran._emitValueChange(1313);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(1313);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('pub/sub value', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('value', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribeValueChange(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      tran.value = 1233;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(1233);

      tran.value = 1000;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(-233);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('subscribeClearedValueChange subscription', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('emits when transaction is cleared and value changes', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = true;

      tran.subscribeClearedValueChange(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      tran.value = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('emits when transaction changes cleared to uncleared', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = true;
      tran.value = 123;
      tran.subscribeClearedValueChange(foo.change);

      tran.cleared = false;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(-123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('emits when transaction changes uncleared to cleared', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = false;
      tran.value = 123;
      tran.subscribeClearedValueChange(foo.change);

      tran.cleared = true;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not emit when transaction is uncleared and value changes', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = false;

      tran.subscribeClearedValueChange(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      tran.value = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('emits to multiple subscribers', () => {
      const foo = {
        change1: () => {},
        change2: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change1');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change2');

      let tran = new Transaction();
      tran.cleared = true;

      tran.subscribeClearedValueChange(foo.change1);
      tran.subscribeClearedValueChange(foo.change2);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change1).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change2).not.toHaveBeenCalled();

      tran.value = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change1).toHaveBeenCalledWith(123);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change2).toHaveBeenCalledWith(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can unsubscribe', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = true;

      tran.subscribeClearedValueChange(foo.change);
      tran.unsubscribeClearedValueChange(foo.change);

      tran.value = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('throws if unsubscriber does not exist', () => {
      let tran = new Transaction();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => {
        tran.unsubscribeClearedValueChange(angular.noop);
      }).toThrow();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('subscribeUnclearedValueChange subscription', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('emits when transaction is uncleared and value changes', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = false;

      tran.subscribeUnclearedValueChange(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      tran.value = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('emits when transaction changes cleared to uncleared', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = true;
      tran.value = 123;
      tran.subscribeUnclearedValueChange(foo.change);

      tran.cleared = false;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('emits when transaction changes uncleared to cleared', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = false;
      tran.value = 123;
      tran.subscribeUnclearedValueChange(foo.change);

      tran.cleared = true;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(-123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('does not emit when transaction is cleared and value changes', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = true;

      tran.subscribeUnclearedValueChange(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      tran.value = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('emits to multiple subscribers', () => {
      const foo = {
        change1: () => {},
        change2: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change1');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change2');

      let tran = new Transaction();
      tran.cleared = false;

      tran.subscribeUnclearedValueChange(foo.change1);
      tran.subscribeUnclearedValueChange(foo.change2);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change1).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change2).not.toHaveBeenCalled();

      tran.value = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change1).toHaveBeenCalledWith(123);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change2).toHaveBeenCalledWith(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can unsubscribe', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.cleared = false;

      tran.subscribeUnclearedValueChange(foo.change);
      tran.unsubscribeUnclearedValueChange(foo.change);

      tran.value = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('throws if unsubscriber does not exist', () => {
      let tran = new Transaction();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => {
        tran.unsubscribeUnclearedValueChange(angular.noop);
      }).toThrow();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('pub/sub', () => {
    let Transaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('value', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().value).toBe(0);

      tran.value = 1233;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().value).toBe(1233);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(tran);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('account', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().account).toBe(null);

      tran.account = 'my_account_id';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().account).toBe('my_account_id');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(tran);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('memo', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().memo).toBe(null);

      tran.memo = 'my_memo';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().memo).toBe('my_memo');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(tran);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('cleared', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().cleared).toBe(false);

      tran.cleared = false;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      tran.cleared = true;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().cleared).toBe(true);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(tran);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('flag', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().flag).toBe(null);

      tran.flag = '#ff0000';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().flag).toBe('#ff0000');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.flag).toBe('#ff0000');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(tran);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('category', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.category).toBe(null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().category).toBe(null);

      tran.category = '123-123-123-123';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().category).toBe('123-123-123-123');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.category).toBe('123-123-123-123');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(tran);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('account', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.account).toBe(null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().account).toBe(null);

      tran.account = '123-123-123-123';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().account).toBe('123-123-123-123');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.account).toBe('123-123-123-123');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(tran);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('memo', () => {
      const foo = {
        change: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let tran = new Transaction();
      tran.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.memo).toBe(null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().memo).toBe(null);

      tran.memo = '123-123-123-123';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.toJSON().memo).toBe('123-123-123-123');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran.memo).toBe('123-123-123-123');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(tran);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('cannot set _id', () => {
      let tran = new Transaction({
        _id: 'foobar'
      });

      tran._id = 123;
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(tran._id).not.toBe(123);
    });
  });

  
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('split transactions', () => {
    let Transaction: any;
    let SplitTransaction: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Transaction = transaction('111-111-111-111');
      SplitTransaction = splitTransaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can have splits', () => {
      const trans = new Transaction({
        value: 123,
        _id: 'b_123-123-123-123_transaction_321-321-321-321',
        splits: [{
          id: 'a',
          category: 'income'
        }]
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(trans.splits.length).toBe(1);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(trans.splits[0].constructor.name).toBe('SplitTransaction');

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(trans.splits[0].transaction).toBe(trans);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('splits should have reference to parent transaction', () => {
      const trans = new Transaction({
        value: 123,
        _id: 'b_123-123-123-123_transaction_321-321-321-321',
        splits: [{
          id: 'a',
          category: 'income'
        }]
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(trans.splits[0].transaction).toBe(trans);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can add splits', () => {
      const trans = new Transaction({
        value: 123,
        _id: 'b_123-123-123-123_transaction_321-321-321-321',
        splits: [{
          id: 'a',
          category: 'income'
        }]
      });

      const split = new SplitTransaction(trans);

      trans.splits = [split];

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(trans.splits[0].transaction).toBe(trans);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can update splits', () => {
      const trans = new Transaction({
        value: 123,
        _id: 'b_123-123-123-123_transaction_321-321-321-321',
        splits: [{
          id: 'a',
          category: 'income'
        }]
      });

      const split = new SplitTransaction(trans);
      const split1id = split.id;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(split, '_emitValueChange');

      const split1dupe = new SplitTransaction(trans, {
        id: split1id,
        value: 123
      });

      trans.splits = [split];

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(split._emitValueChange).not.toHaveBeenCalled();
      
      trans.splits = [split1dupe, new SplitTransaction(trans)];

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(split._emitValueChange).toHaveBeenCalled();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(split1id).toEqual(split.id);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should serialize splits properly', () => {
      const trans = new Transaction({
        value: 123,
        _id: 'b_123-123-123-123_transaction_321-321-321-321'
      });

      const split = new SplitTransaction(trans, {
        id: 'testid'
      });

      split.memo = 'test 123';

      trans.splits = [split];

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(trans.toJSON().splits).toEqual([{
        id: 'testid',
        value: 0,
        category: null,
        memo: 'test 123',
        payee: null,
        transfer: null
      }]);
    });
  });
});
