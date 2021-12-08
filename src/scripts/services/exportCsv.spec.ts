// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('exportCsv', function () {
  let exportCsv: any, transaction, Transaction: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(angular.mock.module('financier'));

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeEach'.
  beforeEach(inject((_exportCsv_: any, _transaction_: any) => {
    exportCsv = _exportCsv_;
    transaction = _transaction_;
    Transaction = transaction('123-123-123-123');
  }));

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('getFlagColor', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('works with unset', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._getFlagColor()).toBeUndefined();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('works with red', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._getFlagColor('#ff0000')).toBe('Red');
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('_buildTransactionsCsv', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('works with no transactions', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: []
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,,,,,,,,,,`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('works with one transaction', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            value: 123
          })
        ]
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,,,,,,,,$0.00,$1.23,Uncleared`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('works with cleared transaction', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            value: 123,
            cleared: true
          })
        ]
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,,,,,,,,$0.00,$1.23,Cleared`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('works with reconciled transaction', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            value: 123,
            cleared: true,
            reconciled: true
          })
        ]
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,,,,,,,,$0.00,$1.23,Reconciled`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('formats numbers properly', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            value: 123,
            cleared: true,
            reconciled: true
          })
        ],
        currencySymbol: '#',
        currencyDigits: 1
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,,,,,,,,#0.0,#12.3,Reconciled`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('gets flag color', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            flag: '#ff0000'
          })
        ]
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,Red,,,,,,,$0.00,$0.00,Uncleared`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('looks up account name', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            account: '123'
          })
        ],
        accounts: [{
          id: '123',
          name: 'Test account'
        }]
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
Test account,,,,,,,,$0.00,$0.00,Uncleared`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('formats date', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            date: '2012-12-12'
          })
        ]
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,,12/12/12,,,,,,$0.00,$0.00,Uncleared`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('formats payee', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            payee: '123'
          })
        ],
        payees: {
          123: {
            name: 'New payee'
          }
        }
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,,,New payee,,,,,$0.00,$0.00,Uncleared`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets memo', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            memo: 'My memo'
          })
        ]
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,,,,,,,My memo,$0.00,$0.00,Uncleared`
      );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('sets memo', () => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
      expect(exportCsv._buildTransactionsCsv({
        transactions: [
          new Transaction({
            memo: 'My memo'
          })
        ]
      })).toEqual(
`Account,Flag,Date,Payee,Category Group/Category,Category Group,Category,Memo,Outflow,Inflow,Cleared\r
,,,,,,,My memo,$0.00,$0.00,Uncleared`
      );
    });
  });
});
