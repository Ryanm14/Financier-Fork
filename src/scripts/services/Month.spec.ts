// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('month', function () {
  let month: any, Month: any, transaction: any, Transaction: any, MonthCategory: any;

  function defaultMonth() {
    return {
      _id: 'b_111-111-111-111_month_' + Month.createID(new Date('1/1/15'))
    };
  }

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_month_: any, _transaction_: any, _MonthCategory_: any) => {
    month = _month_;
    transaction = _transaction_;
    MonthCategory = _MonthCategory_;
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('Month', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      Month = month('111-111-111-111');
      Transaction = transaction('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('static properties', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('createID', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('converts date', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Month.createID(new Date('12/12/15'))).toBe('2015-12-01');
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('converts date in two-digit form', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Month.createID(new Date('1/1/15'))).toBe('2015-01-01');
        });
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('startKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Month.startKey).toBe('b_111-111-111-111_month_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('endKey', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Month.endKey).toBe('b_111-111-111-111_month_\uffff');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('prefix', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(Month.prefix).toBe('b_111-111-111-111_month_');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('contains', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is true if _id is of budget and is Month', () => {
          const mo = new Month('2015-01-01');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Month.contains(mo.data._id)).toBe(true);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of other budget and is Month', () => {
          const OtherBudgetMonth = month('222-222-222-222'),
            mo = new OtherBudgetMonth('2015-01-01');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Month.contains(mo.data._id)).toBe(false);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is of budget and is Month', () => {
          const trans = new Transaction();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Month.contains(trans.data._id)).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is greater than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Month.contains('aaa')).toBe(false);
        });

        // Explicit coverage test
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('is false if _id is less than', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(Month.contains('zzz')).toBe(false);
        });
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can take string', () => {
      var mo = new Month('2015-01-01');

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(angular.equals(mo.data, {
        _id: 'b_111-111-111-111_month_2015-01-01'
      })).toBe(true);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should be a Month', () => {
      const mo = new Month(defaultMonth());
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(mo.constructor.name).toBe('Month');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should serialize to JSON', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(JSON.stringify(new Month(defaultMonth()))).toBe('{"_id":"b_111-111-111-111_month_2015-01-01"}');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should properly extract date', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(new Month(defaultMonth()).date).toBe('2015-01-01');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should notify budgetChange upon budget update', () => {
      const mo = new Month(defaultMonth(), () => {});

      mo.budgetChange = () => {};
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(mo, 'budgetChange');

      mo.setBudget(123, 1200);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(mo.budgetChange).toHaveBeenCalledWith(123, 1200);

      mo.setBudget(123, 1000);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(mo.budgetChange).toHaveBeenCalledWith(123, -200);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should notify subscribeNextMonth upon rolling update', () => {
      const mo = new Month(defaultMonth(), () => {});

      mo.nextRollingFn = () => {};
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
      spyOn(mo, 'nextRollingFn');

      mo.setRolling(123, 1200, true);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(mo.nextRollingFn).toHaveBeenCalledWith(123, 1200, true);

      mo.setRolling(123, 1000, true);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(mo.nextRollingFn).toHaveBeenCalledWith(123, 1000, true);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should allow setting budget', () => {
      const mo = new Month(defaultMonth(), () => {});

      mo.setBudget(123, 1200);

      var data = JSON.parse(JSON.stringify(mo));
      var categoryCache = JSON.parse(JSON.stringify(mo.categoryCache));

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(data).toEqual({
        _id: 'b_111-111-111-111_month_2015-01-01'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(categoryCache).toEqual({
        123: {
          rolling: 0,
          outflow: 0,
          balance: 1200,
          overspending: null
        }
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(mo.categories['123'].budget).toBe(1200);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('can set a rolling (incoming) value', () => {
      const mo = new Month(defaultMonth());

      mo.setRolling(123, 6900, null);

      var data = JSON.parse(JSON.stringify(mo));
      var categoryCache = JSON.parse(JSON.stringify(mo.categoryCache));

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(data).toEqual({
        _id: 'b_111-111-111-111_month_2015-01-01'
      });

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(categoryCache).toEqual({
        123: {
          rolling: 6900,
          outflow: 0,
          balance: 6900,
          overspending: null
        }
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('addBudget', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should be set on categories[]', () => {
        const mo = new Month(defaultMonth(), () => {}),
            cat = MonthCategory.from(
              '111-111-111-111',
              mo.date,
              '333-333-333-333'
            );

        mo.addBudget(cat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.categories['333-333-333-333']).toBe(cat);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('subscribes to saveFn on Month', () => {
        const foo = {
          change: () => {},
        };

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(foo, 'change');

        const mo = new Month(defaultMonth(), foo.change),
            cat = MonthCategory.from(
              '111-111-111-111',
              mo.date,
              '333-333-333-333'
            );

        mo.addBudget(cat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(foo.change).not.toHaveBeenCalled();

        cat._emitChange();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(foo.change).toHaveBeenCalled();
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update categoryCache balance', () => {
        const foo = {
          change: () => {},
        };

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(foo, 'change');

        const mo = new Month(defaultMonth(), foo.change),
            cat = new MonthCategory({
              _id: 'b_111-111-111-111_m_category_2015-01-01_333-333-333-333',
              budget: 300
            });

        mo.addBudget(cat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.categoryCache[cat.categoryId].balance).toBe(300);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update totalBudget', () => {
        const foo = {
          change: () => {},
        };

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(foo, 'change');

        const mo = new Month(defaultMonth(), foo.change),
            cat = new MonthCategory({
              _id: 'b_111-111-111-111_m_category_2015-01-01_333-333-333-333',
              budget: 300
            });

        mo.addBudget(cat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalBudget).toBe(300);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update totalBalance', () => {
        const foo = {
          change: () => {},
        };

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(foo, 'change');

        const mo = new Month(defaultMonth(), foo.change),
            cat = new MonthCategory({
              _id: 'b_111-111-111-111_m_category_2015-01-01_333-333-333-333',
              budget: 300
            });

        mo.addBudget(cat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalBalance).toBe(300);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update totalAvailable', () => {
        const foo = {
          change: () => {},
        };

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(foo, 'change');

        const mo = new Month(defaultMonth(), foo.change),
            cat = new MonthCategory({
              _id: 'b_111-111-111-111_m_category_2015-01-01_333-333-333-333',
              budget: 300
            });

        mo.addBudget(cat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalAvailable).toBe(-300);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call nextChangeAvailableFn with negative budget', () => {
        const mo = new Month(defaultMonth()),
            cat = new MonthCategory({
              _id: 'b_111-111-111-111_m_category_2015-01-01_333-333-333-333',
              budget: 300
            });

        mo.nextChangeAvailableFn = () => {};
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(mo, 'nextChangeAvailableFn');

        mo.addBudget(cat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.nextChangeAvailableFn).toHaveBeenCalledWith(-300);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call saveFn when MonthCategory changes', () => {
        const foo = {
          saveFn: () => {},
        };

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(foo, 'saveFn');

        const mo = new Month(defaultMonth(), foo.saveFn),
            cat = new MonthCategory({
              _id: 'b_111-111-111-111_m_category_2015-01-01_333-333-333-333',
              budget: 300
            });

        mo.addBudget(cat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(foo.saveFn).not.toHaveBeenCalled();

        cat.budget = 200;

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(foo.saveFn).toHaveBeenCalled();
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call budgetChange properly', () => {
        const mo = new Month(defaultMonth(), () => {}),
            cat = new MonthCategory({
              _id: 'b_111-111-111-111_m_category_2015-01-01_333-333-333-333',
              budget: 300
            });

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(mo, 'budgetChange');

        mo.addBudget(cat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.budgetChange).not.toHaveBeenCalled();

        cat.budget = 200;

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.budgetChange).toHaveBeenCalledWith('333-333-333-333', -100);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('_changeCurrentOverspent', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('>= 0 current budget', () => {
          const mo = new Month(defaultMonth(), () => {}),
              cat = new MonthCategory({
                _id: 'b_111-111-111-111_m_category_2015-01-01_333-333-333-333',
                budget: 300
              });

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
          spyOn(mo, '_changeCurrentOverspent');

          mo.addBudget(cat);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo._changeCurrentOverspent).toHaveBeenCalledWith(-0);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('< 0 current budget', () => {
          const mo = new Month(defaultMonth(), () => {}),
              cat = new MonthCategory({
                _id: 'b_111-111-111-111_m_category_2015-01-01_333-333-333-333',
                budget: -300
              });

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
          spyOn(mo, '_changeCurrentOverspent');

          mo.addBudget(cat);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo._changeCurrentOverspent).toHaveBeenCalledWith(300);
        });
      });

    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('totals', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('totalBudget should update on setBudget', () => {
        const mo = new Month(defaultMonth(), () => {});

        mo.setBudget(123, 5000);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalBudget).toBe(5000);

        mo.setBudget(124, 1000);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalBudget).toBe(6000);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('totalBalance', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('totalBalance should update on setRolling', () => {
          const mo = new Month(defaultMonth());

          mo.setRolling(123, 5000);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo.cache.totalBalance).toBe(5000);

          mo.setRolling(124, 1000);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo.cache.totalBalance).toBe(6000);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('totalBalance should update on setBudget', () => {
          const mo = new Month(defaultMonth(), () => {});

          mo.setBudget(123, 5000);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo.cache.totalBalance).toBe(5000);

          mo.setBudget(124, 1000);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo.cache.totalBalance).toBe(6000);
        });
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('addTransaction', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('adjusts balance when added', () => {
        const mo = new Month(defaultMonth(), () => {}),
          trans = new Transaction({
            value: -300,
            category: '123-123-123-123'
          });

        mo.addTransaction(trans);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.categoryCache['123-123-123-123'].balance).toBe(-300);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('adjusts outflow when added', () => {
        const mo = new Month(defaultMonth(), () => {}),
          trans = new Transaction({
            value: -300,
            category: '123-123-123-123'
          });

        mo.addTransaction(trans);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.categoryCache['123-123-123-123'].outflow).toBe(-300);
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('startRolling', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('runs on existing data', () => {
        const mo = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});

        mo.setBudget('123', 333);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(mo, 'setRolling').and.callThrough();

        mo.startRolling(123);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.setRolling).toHaveBeenCalledWith(123, 0, null);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalBalance).toBe(333);
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('budgetChange', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update totalBudget', () => {
          const mo = new Month(defaultMonth());

          mo.createCategoryCacheIfEmpty('333-333-333-333');

          mo.budgetChange('333-333-333-333', 100);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo.cache.totalBudget).toBe(100);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update totalAvailable', () => {
          const mo = new Month(defaultMonth());

          mo.createCategoryCacheIfEmpty('333-333-333-333');

          mo.budgetChange('333-333-333-333', -100);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo.cache.totalAvailable).toBe(100);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call nextChangeAvailableFn properly', () => {
          const mo = new Month(defaultMonth());

          mo.createCategoryCacheIfEmpty('333-333-333-333');

          mo.nextChangeAvailableFn = () => {};
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
          spyOn(mo, 'nextChangeAvailableFn');

          mo.budgetChange('333-333-333-333', -100);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo.nextChangeAvailableFn).toHaveBeenCalledWith(100);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update categoryCache balance', () => {
          const mo = new Month(defaultMonth());

          mo.createCategoryCacheIfEmpty('333-333-333-333');

          mo.budgetChange('333-333-333-333', 100);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo.categoryCache['333-333-333-333'].balance).toBe(100);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('_changeCurrentOverspent', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('>= 0 budget', () => {
          const mo = new Month(defaultMonth(), () => {});

          mo.createCategoryCacheIfEmpty('333-333-333-333');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
          spyOn(mo, '_changeCurrentOverspent');

          mo.budgetChange('333-333-333-333', 50);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo._changeCurrentOverspent).toHaveBeenCalledWith(0);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('< 0 budget', () => {
          const mo = new Month(defaultMonth(), () => {});

          mo.createCategoryCacheIfEmpty('333-333-333-333');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
          spyOn(mo, '_changeCurrentOverspent');

          mo.budgetChange('333-333-333-333', -50);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mo._changeCurrentOverspent).toHaveBeenCalledWith(50);
        });
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update totalBalance', () => {
        const mo = new Month(defaultMonth());

        mo.createCategoryCacheIfEmpty('333-333-333-333');

        mo.budgetChange('333-333-333-333', 150);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalBalance).toBe(150);
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('changeAvailable', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update totalAvailable', () => {
        const mo = new Month(defaultMonth());

        mo.changeAvailable(500);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalAvailable).toBe(500);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call nextChangeAvailableFn properly', () => {
        const mo = new Month(defaultMonth());

        mo.nextChangeAvailableFn = () => {};
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(mo, 'nextChangeAvailableFn');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.nextChangeAvailableFn).not.toHaveBeenCalled();

        mo.changeAvailable(500);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.nextChangeAvailableFn).toHaveBeenCalledWith(500);
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('_changeCurrentOverspent', () => {

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update totalOverspent', () => {
        const mo = new Month(defaultMonth());

        mo._changeCurrentOverspent(500);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalOverspent).toBe(500);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call nextChangeOverspentFn properly', () => {
        const mo = new Month(defaultMonth());

        mo.nextChangeOverspentFn = () => {};
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(mo, 'nextChangeOverspentFn');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.nextChangeOverspentFn).not.toHaveBeenCalled();

        mo._changeCurrentOverspent(500);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.nextChangeOverspentFn).toHaveBeenCalledWith(500);
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('changeOverspent', () => {

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should update totalOverspent', () => {
        const mo = new Month(defaultMonth());

        mo.changeOverspent(500);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalOverspentLastMonth).toBe(500);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call changeAvailable properly', () => {
        const mo = new Month(defaultMonth());

        mo.changeAvailable = () => {};
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(mo, 'changeAvailable');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.changeAvailable).not.toHaveBeenCalled();

        mo.changeOverspent(500);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.changeAvailable).toHaveBeenCalledWith(-500);
      });
    });


    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('overspending', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('is null by default', () => {
        const mo = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});

        mo.startRolling(123);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.categoryCache[123].overspending).toBe(null);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('overrides default when adding month category', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );
        moCat.overspending = true;

        mo1.addBudget(moCat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.categoryCache['123'].overspending).toBe(true);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('overrides next months default when adding month category', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = true;

        mo1.addBudget(moCat);

        mo1.startRolling('123');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.categoryCache['123'].overspending).toBe(true);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.categoryCache['123'].overspending).toBe(true);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=true propagates negative balances to next months', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = true;
        moCat.budget = -123;

        mo1.addBudget(moCat);

        mo1.startRolling('123');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.categoryCache['123'].balance).toBe(-123);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.categoryCache['123'].balance).toBe(-123);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=true does not set overspent when adding month category', () => {
        const mo = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = true;
        moCat.budget = -123;

        mo.addBudget(moCat);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo.cache.totalOverspent).toBe(0);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=true does not set overspent', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = true;
        moCat.budget = -123;

        mo1.addBudget(moCat);

        mo1.startRolling('123');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.cache.totalOverspent).toBe(0);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalOverspent).toBe(0);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=true should propagate totalBalance', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = true;
        moCat.budget = -123;

        mo1.addBudget(moCat);

        mo1.startRolling('123');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.cache.totalBalance).toBe(-123);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalBalance).toBe(-123);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=false->true reacts with totalOverspent', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = false;
        moCat.budget = -123;

        mo1.addBudget(moCat);

        mo1.startRolling('123');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.cache.totalOverspent).toBe(123);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalOverspentLastMonth).toBe(123);

        moCat.overspending = true;

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.cache.totalOverspent).toBe(0);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalOverspentLastMonth).toBe(0);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=true->false reacts with totalOverspent', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = true;
        moCat.budget = -123;

        mo1.addBudget(moCat);

        mo1.startRolling('123');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.cache.totalOverspent).toBe(0);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalOverspentLastMonth).toBe(0);

        moCat.overspending = false;

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.cache.totalOverspent).toBe(123);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalOverspentLastMonth).toBe(123);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=false->true propagates negative balances to next months', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = false;
        moCat.budget = -123;

        mo1.addBudget(moCat);

        mo1.startRolling('123');

        moCat.overspending = true;

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.categoryCache['123'].balance).toBe(-123);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.categoryCache['123'].balance).toBe(-123);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=false->true should propagate totalBalance', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = false;
        moCat.budget = -123;

        mo1.addBudget(moCat);

        mo1.startRolling('123');

        moCat.overspending = true;

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.cache.totalBalance).toBe(-123);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalBalance).toBe(-123);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=true->false should not propagate totalBalance', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = true;
        moCat.budget = -123;

        mo1.addBudget(moCat);

        mo1.startRolling('123');

        moCat.overspending = false;

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.cache.totalBalance).toBe(-123);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalBalance).toBe(0);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('=true propagates to following months with later transaction(s)', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);

        const moCat = MonthCategory.from(
          '111-111-111-111',
          '201501',
          '123'
        );

        moCat.overspending = true;

        mo1.addBudget(moCat);

        mo2.addTransaction(new Transaction({ value: -22, category: '123' }));

        mo1.startRolling('123');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalOverspent).toBe(0);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('multiple months', () => {
        const mo1 = new Month({
          _id: Month.createID(new Date('1/1/15'))
        }, () => {});
        const mo2 = new Month({
          _id: Month.createID(new Date('2/1/15'))
        }, () => {});
        const mo3 = new Month({
          _id: Month.createID(new Date('3/1/15'))
        }, () => {});

        mo1.subscribeNextMonth(mo2);
        mo2.subscribeNextMonth(mo3);

        const moCat2 = MonthCategory.from(
          '111-111-111-111',
          '201502',
          '123'
        );
        moCat2.overspending = false;
        // moCat.budget = -123;

        const moCat1 = MonthCategory.from(
          '111-111-111-111',
          '201502',
          '123'
        );
        moCat1.overspending = true;
        moCat1.budget = -123;

        mo1.addBudget(moCat1);
        mo2.addBudget(moCat2);

        mo1.startRolling('123');

        // moCat.overspending = false;

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo1.cache.totalBalance).toBe(-123);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo2.cache.totalBalance).toBe(-123);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mo3.cache.totalBalance).toBe(0);
      });

      // todo test overspending works for outflows
    });
  });
});
