// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Budget', function () {
  let Budget: any, account: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_Budget_: any, _account_: any) => {
    Budget = _Budget_;
    account = _account_;
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('new Budget()', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('static property', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Budget.startKey).toBe('budget_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Budget.endKey).toBe('budget_\uffff');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('prefix', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Budget.prefix).toBe('budget_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('contains', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is true if _id is of budget', () => {
          const bdg = new Budget();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Budget.contains(bdg.data._id)).toBe(true);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is not of budget', () => {
          const Account = account('222-222-222-222'),
            acc = new Account();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Budget.contains(acc.data._id)).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is greater than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Budget.contains('aaa')).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is less than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Budget.contains('zzz')).toBe(false);
        });
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('is a Budget', () => {
      let sets = new Budget();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.constructor.name).toBe('Budget');
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take existing settings', () => {
      let sets = new Budget({
        hints: {
          outflow: false
        },
        name: 'foobar',
        created: '2016-03-03T03:16:34.882Z'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.hints.outflow).toBe(false);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.name).toBe('foobar');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.created instanceof Date).toBe(true);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.created.toISOString()).toBe('2016-03-03T03:16:34.882Z');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take no constructor params', () => {
      let sets = new Budget();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.constructor.name).toBe('Budget');

      // should compare *that* second... may cause race conditions :/
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.created.toUTCString()).toBe(new Date().toUTCString());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(new Date(sets.toJSON().created).toUTCString()).toBe(new Date().toUTCString());
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('exposes default settings', () => {
      let sets = new Budget();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets._id.indexOf('budget_')).toBe(0);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.hints.outflow).toBe(true);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns id from _id', () => {
      let sets = new Budget({
        _id: 'budget_222-222-222-222'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.id).toBe('222-222-222-222');
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('can be removed', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let sets = new Budget();

      sets.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.toJSON()._deleted).not.toBeDefined();

      sets.remove();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(sets);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.toJSON()._deleted).toBe(true);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('set', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hints.outflow', () => {
      let sets = new Budget();

      sets.hints.outflow = false;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.toJSON().hints.outflow).toBe(false);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('name', () => {
      let sets = new Budget();

      sets.name = 'foobar';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.toJSON().name).toBe('foobar');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('cannot set _id', () => {
      let sets = new Budget();

      sets._id = 123;
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets._id).not.toBe(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('cannot set created', () => {
      let sets = new Budget();

      sets.created = 123;
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.created).not.toBe(123);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('pub/sub', () => {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('hints.outflow', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let sets = new Budget({
        hints: {
          outflow: false
        }
      });

      sets.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      sets.hints.outflow = true;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(sets);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('name', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let sets = new Budget({
        name: 'foobar'
      });

      sets.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      sets.name = 'barfoo';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(sets);
    });
  });
});
