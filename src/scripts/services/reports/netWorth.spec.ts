// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('netWorth', function () {
  let netWorth: any, transaction, Transaction: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_netWorth_: any, _transaction_: any) => {
    netWorth = _netWorth_;
    transaction = _transaction_;

    Transaction = transaction('111-111-111-111');
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('function', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('returns expected object schema', () => {
      const report = netWorth([]);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(report).toEqual({
        assets: [],
        debt: [],
        netWorth: [],
        months: []
      });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('generates a report', () => {
      const report = netWorth([
        new Transaction({
          date: '2012-12-12T06:00:00.000Z',
          value: 12,
          account: '123'
        }),
        new Transaction({
          date: '2013-01-01T06:00:00.000Z',
          value: -500,
          account: '321'
        }),
        new Transaction({
          date: '2013-01-01T06:00:00.000Z',
          value: 100,
          account: '123'
        }),
        new Transaction({
          date: '2013-04-01T06:00:00.000Z',
          value: 150,
          account: '123'
        })
      ]);

      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(report.assets).toEqual([ 12, 112, 112, 112, 262 ]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(report.debt).toEqual([ 0, 500, 500, 500, 500 ]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(report.netWorth).toEqual([ 12, -388, -388, -388, -238 ]);
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(report.months.length).toEqual(5);
    });
  });
});
