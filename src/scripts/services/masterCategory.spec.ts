// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('masterCategory', function () {
  let category: any, masterCategory: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_category_: any, _masterCategory_: any) => {
    category = _category_;
    masterCategory = _masterCategory_;
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('takes a budgetId and returns MasterCategory', () => {
    const MasterCategory = masterCategory('123-123-123-123');

    const cat = new MasterCategory();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(cat.constructor.name).toBe('MasterCategory');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('new MasterCategory()', () => {
    let MasterCategory: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      MasterCategory = masterCategory('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('static property', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(MasterCategory.startKey).toBe('b_111-111-111-111_master-category_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(MasterCategory.endKey).toBe('b_111-111-111-111_master-category_\uffff');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('prefix', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(MasterCategory.prefix).toBe('b_111-111-111-111_master-category_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('contains', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is true if _id is of budget and is MasterCategory', () => {
          const cat = new MasterCategory();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MasterCategory.contains(cat.data._id)).toBe(true);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of other budget and is MasterCategory', () => {
          const OtherBudgetCategory = masterCategory('222-222-222-222'),
            cat = new OtherBudgetCategory();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MasterCategory.contains(cat.data._id)).toBe(false);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of budget and is MasterCategory', () => {
          const Category = category('111-111-111-111'),
            cat = new Category();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MasterCategory.contains(cat.data._id)).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is greater than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MasterCategory.contains('aaa')).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is less than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MasterCategory.contains('zzz')).toBe(false);
        });
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take an existing database document', () => {
      let cat = new MasterCategory({
        name: 'My cat',
        _id: 'b_123-123-123-123_master-category_321-321-321-321'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.constructor.name).toBe('MasterCategory');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can create default id', () => {
      let cat = new MasterCategory();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat._id.indexOf('b_111-111-111-111_master-category_')).toBe(0);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('exposes default name and no default note', () => {
      let cat = new MasterCategory({
        _id: 'foo'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.note).not.toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.data._id).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.name).toBe('New master category');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('uses existing _id if exists', () => {
      let cat = new MasterCategory({
        _id: 'b_123-123-123-123_master-category_321-321-321-321'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat._id).toBe('b_123-123-123-123_master-category_321-321-321-321');
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('set', () => {
    let MasterCategory: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      MasterCategory = masterCategory('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('sort', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('has getter/setter, saves to record', () => {
        let cat = new MasterCategory();

        cat.sort = 2;

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(cat.toJSON().sort).toEqual(2);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(cat.sort).toEqual(2);

      });
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('pub/sub', () => {
    let MasterCategory: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      MasterCategory = masterCategory('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sort', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let cat = new MasterCategory({
        name: 'My catount',
        _id: 'foobar',
        sort: 2
      });

      cat.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      cat.sort = 2;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      cat.sort = 3;

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalled();
    });
  });
});
