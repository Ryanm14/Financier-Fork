// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('category', function () {
  let category: any, transaction: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_category_: any, _transaction_: any) => {
    category = _category_;
    transaction = _transaction_;
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('static property', () => {
    let Category: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Category = category('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('startKey', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Category.startKey).toBe('b_111-111-111-111_category_');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('startKey', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Category.endKey).toBe('b_111-111-111-111_category_\uffff');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('prefix', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(Category.prefix).toBe('b_111-111-111-111_category_');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('contains', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is true if _id is of budget and is Category', () => {
        const cat = new Category();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Category.contains(cat.data._id)).toBe(true);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is false if _id is of other budget and is Category', () => {
        const OtherBudgetCategory = category('222-222-222-222'),
          cat = new OtherBudgetCategory();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Category.contains(cat.data._id)).toBe(false);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is false if _id is of budget and is Category', () => {
        const Transaction = transaction('111-111-111-111'),
          trans = new Transaction();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Category.contains(trans.data._id)).toBe(false);
      });

      // Explicit coverage test
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is false if _id is greater than', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Category.contains('aaa')).toBe(false);
      });

      // Explicit coverage test
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is false if _id is less than', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Category.contains('zzz')).toBe(false);
      });
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('is a function', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(typeof category).toBe('function');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('takes a budgetId and returns Category', () => {
    const Category = category('123-123-123-123');

    const cat = new Category();

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(cat.constructor.name).toBe('Category');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('new Category()', () => {
    let Category: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Category = category('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take an existing database document', () => {
      let cat = new Category({
        name: 'My cat',
        _id: 'b_123-123-123-123_category_321-321-321-321'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.constructor.name).toBe('Category');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can create default id', () => {
      let cat = new Category();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat._id.indexOf('b_111-111-111-111_category_')).toBe(0);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('exposes default name and no default note', () => {
      let cat = new Category({
        _id: 'foo'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.note).not.toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.data._id).toBeDefined();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.name).toBe('New category');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('uses existing _id if exists', () => {
      let cat = new Category({
        _id: 'b_123-123-123-123_category_321-321-321-321'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat._id).toBe('b_123-123-123-123_category_321-321-321-321');
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('can be removed', () => {
      const Category = category('111-111-111-111');

      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let cat = new Category({
        _id: 'foo'
      });

      cat.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.toJSON()._deleted).not.toBeDefined();

      cat.remove();

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(cat);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.toJSON()._deleted).toBe(true);
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('set', () => {
    let Category: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Category = category('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('name', () => {
      let cat = new Category({
        name: 'My cat',
        _id: 'foobar'
      });

      cat.name = 'My custom name';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.toJSON().name).toBe('My custom name');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('note', () => {
      let cat = new Category({
        note: 'newnote',
        _id: 'foobar'
      });

      cat.note = 'newnote2';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat.toJSON().note).toBe('newnote2');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('cannot set _id', () => {
      let cat = new Category({
        _id: 'foobar'
      });

      cat._id = 123;
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(cat._id).not.toBe(123);
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('pub/sub', () => {
    let Category: any;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Category = category('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('name', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let cat = new Category({
        name: 'My catount',
        _id: 'foobar'
      });

      cat.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      cat.name = 'My custom name';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(cat);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('note', () => {
      const foo = {
        change: () => {},
      };

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(foo, 'change');

      let cat = new Category({
        note: 'first note',
        _id: 'foobar'
      });

      cat.subscribe(foo.change);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).not.toHaveBeenCalled();

      cat.note = 'updated note';

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(foo.change).toHaveBeenCalledWith(cat);
    });

  });
});
