// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('payee', function () {
  let payeeService: any, Payee: any, Transaction: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_payee_: any, _transaction_: any) => {
    payeeService = _payee_;

    Payee = payeeService('111-111-111-111');
    Transaction = _transaction_('111-111-111-111');
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('new Payee()', () => {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('static property', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Payee.startKey).toBe('b_111-111-111-111_payee_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Payee.endKey).toBe('b_111-111-111-111_payee_\uffff');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('prefix', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Payee.prefix).toBe('b_111-111-111-111_payee_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('contains', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is true if _id is of budget and is payee', () => {
          const payee = new Payee();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Payee.contains(payee.data._id)).toBe(true);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of other budget and is payee', () => {
          const OtherBudgetPayee = payeeService('222-222-222-222'),
            payee = new OtherBudgetPayee();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Payee.contains(payee.data._id)).toBe(false);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of transaction and is payee', () => {
          const payee = new Payee();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Transaction.contains(payee.data._id)).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is greater than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Payee.contains('aaa')).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is less than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Payee.contains('zzz')).toBe(false);
        });
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take an existing database document', () => {
      let payee = new Payee({
        name: 'Apple',
        autosuggest: false
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.constructor.name).toBe('Payee');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take no constructor params', () => {
      let payee = new Payee();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.constructor.name).toBe('Payee');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('exposes default name and autosuggest', () => {
      let payee = new Payee();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.name).toBe(null);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.data._id).toBeDefined(); // randomly generated if not provided
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.autosuggest).toBe(true);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('generates _id if none exists', () => {
      let payee = new Payee();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.data._id).toBeDefined();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('uses existing _id if exists', () => {
      let payee = new Payee({
        _id: 'myid'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.data._id).toBe('myid');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('prefixes _id properly', () => {
      let payee = new Payee();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.data._id.indexOf('b_111-111-111-111_payee_')).toEqual(0);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets id properly', () => {
      let payee = new Payee({
        _id: 'b_111-111-111-111_payee_123-123-123-123'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.id).toBe('123-123-123-123');
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('can be removed', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let payee = new Payee();

      payee.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.toJSON()._deleted).not.toBeDefined();

      payee.remove();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(payee);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.toJSON()._deleted).toBe(true);

  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('set', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('name', () => {
      let payee = new Payee({
        name: 'My payee'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.toJSON().name).toBe('My payee');

      payee.name = 'My custom name';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.toJSON().name).toBe('My custom name');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('autosuggest', () => {
      let payee = new Payee({
        autosuggest: true
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.toJSON().autosuggest).toBe(true);

      payee.autosuggest = false;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(payee.toJSON().autosuggest).toBe(false);
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

      let payee = new Payee({
        name: 'My payee'
      });

      payee.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      payee.name = 'My custom name';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(payee);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('autosuggest', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let payee = new Payee({
        autosuggest: true
      });

      payee.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      payee.autosuggest = false;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(payee);
    });
  });
});
