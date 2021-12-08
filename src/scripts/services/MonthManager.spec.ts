// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('category', function () {
  let monthManager: any, MonthManager: any, month: any, Month: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_monthManager_: any, _month_: any) => {
    monthManager = _monthManager_;
    month = _month_;
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('is a function', () => {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(typeof monthManager).toBe('function');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('MonthManager class', () => {

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
    beforeEach(() => {
      MonthManager = monthManager('111-111-111-111');
      Month = month('111-111-111-111');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('static properties', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('_diff', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('0 for same date', () => {
          const date = new Date('1/1/16');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthManager._diff(date, date)).toBe(0);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('1 for next month', () => {
          const first = new Date('1/1/16');
          const second = new Date('2/1/16');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthManager._diff(first, second)).toBe(1);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('-1 for previous month', () => {
          const first = new Date('2/1/16');
          const second = new Date('1/1/16');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthManager._diff(first, second)).toBe(-1);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('1 for 2/29 => 3/1', () => {
          const first = new Date('2/29/16');
          const second = new Date('3/1/16');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthManager._diff(first, second)).toBe(1);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('26 for multiple years', () => {
          const first = new Date('1/1/16');
          const second = new Date('3/1/18');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthManager._diff(first, second)).toBe(26);
        });
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('_dateIDToDate', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('converts ID to date', () => {
          const date = MonthManager._dateIDToDate('2016-06-07');

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(date.getFullYear()).toBe(2016);
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(date.getMonth()).toBe(5); // June
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(date.getDate()).toBe(1);
        });
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('_nextDateID', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('Jul => Aug', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthManager._nextDateID('2016-06-01')).toBe('2016-07-01');
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('Dec => Jan', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthManager._nextDateID('2016-12-01')).toBe('2017-01-01');
        });
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('_previousDateID', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('Aug => Jul', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthManager._previousDateID('2016-07-01')).toBe('2016-06-01');
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('Jan => Feb', () => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(MonthManager._previousDateID('2017-01-01')).toBe('2016-12-01');
        });
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('constructor', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('adds one month if none provided', () => {
        const someFunction = () => {},
          mm = new MonthManager(undefined, someFunction);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm.months.length).toBe(1);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm.months[0].date).toBe(Month.createID(new Date()));
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm.saveFn).toBe(someFunction);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('fills month gaps as needed', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(MonthManager.prototype, '_fillMonthGaps').and.callThrough();

        const mm = new MonthManager();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(MonthManager.prototype._fillMonthGaps).toHaveBeenCalledWith(mm.months);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('links months properly', () => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(MonthManager.prototype, '_linkMonths');

        const mm = new MonthManager([
          new Month('2016-05-01'),
          new Month('2016-07-01')
        ]);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm._linkMonths.calls.all().map((c: any) => c.args)).toEqual([
          [mm.months[0], mm.months[1]],
          [mm.months[1], mm.months[2]]
        ]);
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('_fillMonthGaps', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('Does not do anything with 0 items', () => {
        const mm = new MonthManager();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm._fillMonthGaps([]).length).toBe(0);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('Does not do anything with 1 item', () => {
        const mm = new MonthManager(),
          myMonth = new Month('2015-01-01');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm._fillMonthGaps([myMonth])[0]).toBe(myMonth);
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('Throws if months are out of order', () => {
        const mm = new MonthManager();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(() => {
          mm._fillMonthGaps([
            new Month('2015-02-01'),
            new Month('2015-01-01')
          ]);
        }).toThrow();
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('Throws if months are duplicated', () => {
        const mm = new MonthManager();

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(() => {
          mm._fillMonthGaps([
            new Month('2015-02-01'),
            new Month('2015-02-01')
          ]);
        }).toThrow();
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('filling month gaps', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('creates appropriate months', () => {
          const mm = new MonthManager();

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm._fillMonthGaps([
            new Month('2016-05-01'),
            new Month('2016-07-01'),
            new Month('2016-08-01'),
            new Month('2017-07-01')
          ]).map((m: any) => m.date)).toEqual([
            '2016-05-01',
            '2016-06-01',
            '2016-07-01',
            '2016-08-01',
            '2016-09-01',
            '2016-10-01',
            '2016-11-01',
            '2016-12-01',
            '2017-01-01',
            '2017-02-01',
            '2017-03-01',
            '2017-04-01',
            '2017-05-01',
            '2017-06-01',
            '2017-07-01'
          ]);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('sets up saveFn', () => {
          const myFn = () => {},
            mm = new MonthManager(undefined, myFn);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm._fillMonthGaps([
            new Month('2016-05-01'),
            new Month('2016-07-01')
          ])[1].saveFn).toBe(myFn);
        });
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('getMonth', () => {
      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('gets an existing month', () => {
        const mo = new Month('2016-07-01'),
          mm = new MonthManager([
            new Month('2016-05-01'),
            new Month('2016-06-01'),
            mo,
            new Month('2017-08-01')
          ]);


        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm.getMonth(new Date('2016-07-02'))).toBe(mo);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm.getMonth(new Date('2016-07-02')).date).toEqual('2016-07-01');
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('gets a future month', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('adds months properly', () => {
          const mm = new MonthManager([
            new Month('2016-05-01')
          ]);

          mm.getMonth(new Date('2016-07-02'));

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm.months.map((m: any) => m.date)).toEqual([
            '2016-05-01',
            '2016-06-01',
            '2016-07-01'
          ]);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('returns proper month', () => {
          const mm = new MonthManager([
            new Month('2016-05-01')
          ]);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm.getMonth(new Date('2016-07-02')).date).toBe('2016-07-01');
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm.getMonth(new Date('2016-07-02'))).toBe(mm.months[2]);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('links months', () => {
          const mm = new MonthManager([
            new Month('2016-05-01'),
            new Month('2016-06-01')
          ]);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
          spyOn(mm, '_linkMonths');

          mm.getMonth(new Date('2016-09-02'));

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm._linkMonths.calls.all().map((c: any) => c.args)).toEqual([
            [mm.months[1], mm.months[2]],
            [mm.months[2], mm.months[3]],
            [mm.months[3], mm.months[4]]
          ]);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('propagates rolling to new months', () => {
          const mo = new Month('2016-06-01'),
            mm = new MonthManager([
            new Month('2016-05-01'),
            mo
          ]);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
          spyOn(mm, '_propagateRollingFromMonth');

          mm.getMonth(new Date('2016-09-02'));

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm._propagateRollingFromMonth).toHaveBeenCalledWith(mo);
        });
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('gets a past month', () => {
        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('adds months properly', () => {
          const mm = new MonthManager([
            new Month('2016-05-01')
          ]);

          mm.getMonth(new Date('2016-03-02'));

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm.months.map((m: any) => m.date)).toEqual([
            '2016-03-01',
            '2016-04-01',
            '2016-05-01'
          ]);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('returns proper month', () => {
          const mm = new MonthManager([
            new Month('2016-05-01')
          ]);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm.getMonth(new Date('2016-03-02')).date).toBe('2016-03-01');
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm.getMonth(new Date('2016-03-02'))).toBe(mm.months[0]);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('links months', () => {
          const mm = new MonthManager([
            new Month('2016-05-01'),
            new Month('2016-06-01')
          ]);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
          spyOn(mm, '_linkMonths');

          mm.getMonth(new Date('2016-03-02'));

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm._linkMonths.calls.all().map((c: any) => c.args)).toEqual([
            [mm.months[1], mm.months[2]], // 04 => 05
            [mm.months[0], mm.months[1]]  // 03 => 04
          ]);
        });

        // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('propagates rolling to new months', () => {
          const mo = new Month('2016-06-01'),
            mm = new MonthManager([
            new Month('2016-05-01'),
            mo
          ]);

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
          spyOn(mm, '_propagateRollingFromMonth');

          mm.getMonth(new Date('2016-09-02'));

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
          expect(mm._propagateRollingFromMonth).toHaveBeenCalledWith(mo);
        });
      });

      // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('gets a past month', () => {
        const mm = new MonthManager([
            new Month('2016-05-01')
          ]);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spyOn'.
        spyOn(mm, '_linkMonths');

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm.getMonth(new Date('2016-02-02'))).toBe(mm.months[0]);
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm.months.map((m: any) => m.date)).toEqual([
          '2016-02-01',
          '2016-03-01',
          '2016-04-01',
          '2016-05-01'
        ]);

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
        expect(mm._linkMonths).toHaveBeenCalledWith(mm.months[0], mm.months[1]);
      });

      // describe('addMonthCategory', () => {
      // });
    });
  });
});



// OLD TESTS FROM BUDGETMANAGER BELOW FOR REFERENCE

// it('should provide Months until specified date', () => {
//   return db._pouch.bulkDocs([{
//     _id: 'b_555-555-555-555_month_' + Month.createID(new Date('1/1/15'))
//   }, {
//     _id: 'b_555-555-555-555_month_' + Month.createID(new Date('2/1/15'))
//   }, {
//     _id: 'b_555-555-555-555_month_' + Month.createID(new Date('3/1/15'))
//   }]).then(res => {
//     return budget.budget.getFourMonthsFrom(new Date('6/1/15')).then(res => {
//       const expectedDates = [
//         '2015-01-01',
//         '2015-02-01',
//         '2015-03-01',
//         '2015-04-01',
//         '2015-05-01',
//         '2015-06-01',
//         '2015-07-01',
//         '2015-08-01',
//         '2015-09-01',
//         '2015-10-01',
//         '2015-11-01'
//       ];

//       expect(res.length).toBe(expectedDates.length);

//       for (var i = 0; i < res.length; i++) {
//         expect(res[i].data._id).toBe('b_555-555-555-555_month_' + expectedDates[i]);
//       }
//     });
//   });
// });

// it('should provide Months before specified date', () => {
//   return db._pouch.bulkDocs([{
//     _id: 'b_555-555-555-555_month_' + Month.createID(new Date('4/1/15'))
//   }, {
//     _id: 'b_555-555-555-555_month_' + Month.createID(new Date('5/1/15'))
//   }, {
//     _id: 'b_555-555-555-555_month_' + Month.createID(new Date('6/1/15'))
//   }]).then(res => {
//     return budget.budget.getFourMonthsFrom(new Date('1/1/15')).then(res => {
//       const expectedDates = [
//         '2015-01-01',
//         '2015-02-01',
//         '2015-03-01',
//         '2015-04-01',
//         '2015-05-01',
//         '2015-06-01'
//       ];

//       expect(res.length).toBe(expectedDates.length);

//       for (var i = 0; i < res.length; i++) {
//         expect(res[i].data._id).toBe('b_555-555-555-555_month_' + expectedDates[i]);
//       }

//     });
//   });
// });

// it('should provide existing if populating to that last month', () => {
//   return db._pouch.bulkDocs([{
//     _id: 'b_555-555-555-555_month_' + Month.createID(new Date('1/1/15'))
//   }, {
//     _id: 'b_555-555-555-555_month_' + Month.createID(new Date('2/1/15'))
//   }, {
//     _id: 'b_555-555-555-555_month_' + Month.createID(new Date('3/1/15'))
//   }]).then(res => {
//     return budget.budget.getFourMonthsFrom(new Date('3/1/15')).then(res => {
//       const expectedDates = [
//         '2015-01-01',
//         '2015-02-01',
//         '2015-03-01',
//         '2015-04-01',
//         '2015-05-01',
//         '2015-06-01',
//         '2015-07-01',
//         '2015-08-01'
//       ];

//       expect(res.length).toBe(expectedDates.length);

//       for (var i = 0; i < res.length; i++) {
//         expect(res[i].data._id).toBe('b_555-555-555-555_month_' + expectedDates[i]);
//       }
//     });
//   });
// });

// it('should add that date if none exists in database', () => {
//   return budget.budget.getFourMonthsFrom(new Date('3/1/15')).then(res => {
//     const expectedDates = [
//       '2015-03-01',
//       '2015-04-01',
//       '2015-05-01',
//       '2015-06-01',
//       '2015-07-01',
//     ];

//     expect(res.length).toBe(expectedDates.length);

//     for (var i = 0; i < res.length; i++) {
//       expect(res[i].data._id).toBe('b_555-555-555-555_month_' + expectedDates[i]);
//     }
//   });
// });
