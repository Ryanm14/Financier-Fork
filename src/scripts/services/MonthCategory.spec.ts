// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('MonthCategory', function () {
  let MonthCategory: any, transaction: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_MonthCategory_: any, _transaction_: any) => {
    MonthCategory = _MonthCategory_;
    transaction = _transaction_;
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('new Budget.from()', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('static property', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(MonthCategory.startKey('111-111-111-111')).toBe('b_111-111-111-111_m_category_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(MonthCategory.endKey('111-111-111-111')).toBe('b_111-111-111-111_m_category_\uffff');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('prefix', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(MonthCategory.prefix('111-111-111-111')).toBe('b_111-111-111-111_m_category_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('contains', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is true if _id is of budget and is MonthCategory', () => {
          let moCat = MonthCategory.from(
            '111-111-111-111',
            '201501',
            '333-333-333-333'
          );

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthCategory.contains('111-111-111-111', moCat.data._id)).toBe(true);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of other budget and is MonthCategory', () => {
          let moCat = MonthCategory.from(
            '111-111-111-111',
            '201501',
            '333-333-333-333'
          );

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthCategory.contains('222-222-222-222', moCat.data._id)).toBe(false);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of budget and is MonthCategory', () => {
          const Transaction = transaction('111-111-111-111'),
            trans = new Transaction();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthCategory.contains('111-111-111-111', trans.data._id)).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is greater than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthCategory.contains('111-111-111-111', 'aaa')).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is less than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthCategory.contains('111-111-111-111', 'zzz')).toBe(false);
        });
      });
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('is a Budget', () => {
      let sets = MonthCategory.from(
        '111-111-111-111',
        '201501',
        '333-333-333-333'
      );

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.constructor.name).toBe('MonthCategory');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('creates proper _id', () => {
      let sets = MonthCategory.from(
        '111-111-111-111',
        '201501',
        '333-333-333-333'
      );

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets._id).toBe('b_111-111-111-111_m_category_201501_333-333-333-333');
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('new Budget()', () => {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take existing settings', () => {
      let sets = new MonthCategory({
        _id: 'b_111-111_m_201501_222-222',
        budget: 223
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.budget).toBe(223);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('throws if no constructor params', () => {
      
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(() => {
        new MonthCategory();
      }).toThrow();

    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('set', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('budget', () => {
      let sets = new MonthCategory({
        _id: 'b_111-111_m_201501_month-category_222-222'
      });

      sets.budget = 123;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.toJSON().budget).toBe(123);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('note', () => {
      let sets = new MonthCategory({
        _id: 'b_111-111_m_201501_month-category_222-222'
      });

      sets.note = 'foobar';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.toJSON().note).toBe('foobar');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.note).toBe('foobar');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('overspending', () => {
      let sets = new MonthCategory({
        _id: 'b_111-111_m_201501_month-category_222-222'
      });

      sets.overspending = true;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.toJSON().overspending).toBe(true);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(sets.overspending).toBe(true);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('pub/sub', () => {

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('budget', () => {
      const foo = {
        sub: () => {},
        bdgSub: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'sub');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'bdgSub');

      let sets = new MonthCategory({
        _id: 'b_111-111_m_201501_month-category_222-222',
        budget: 12
      });

      sets.subscribe(foo.sub);
      sets.subscribeBudget(foo.bdgSub);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.sub).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.bdgSub).not.toHaveBeenCalled();

      sets.budget = 222;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.sub).toHaveBeenCalledWith(sets);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.bdgSub).toHaveBeenCalledWith(210);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('budget does not emit event if the same', () => {
      const foo = {
        sub: () => {},
        bdgSub: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'sub');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'bdgSub');

      let sets = new MonthCategory({
        _id: 'b_111-111_m_201501_month-category_222-222',
        budget: 12
      });

      sets.subscribe(foo.sub);
      sets.subscribeBudget(foo.bdgSub);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.sub).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.bdgSub).not.toHaveBeenCalled();

      sets.budget = 12;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.sub).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.bdgSub).not.toHaveBeenCalled();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('note', () => {
      const foo = {
        sub: () => {},
        bdgSub: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'sub');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'bdgSub');


      let sets = new MonthCategory({
        _id: 'b_111-111_m_201501_month-category_222-222',
        note: 'foobar'
      });

      sets.subscribe(foo.sub);
      sets.subscribeBudget(foo.bdgSub);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.sub).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.bdgSub).not.toHaveBeenCalled();

      sets.note = 'barfoo';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.sub).toHaveBeenCalledWith(sets);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.bdgSub).not.toHaveBeenCalled();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('overspending', () => {
      const foo = {
        sub: () => {},
        bdgSub: () => {}
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'sub');
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'bdgSub');


      let sets = new MonthCategory({
        _id: 'b_111-111_m_201501_month-category_222-222',
        overspending: true
      });

      sets.subscribe(foo.sub);
      sets.subscribeBudget(foo.bdgSub);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.sub).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.bdgSub).not.toHaveBeenCalled();

      sets.overspending = false;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.sub).toHaveBeenCalledWith(sets);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.bdgSub).not.toHaveBeenCalled();
    });

  });
});
