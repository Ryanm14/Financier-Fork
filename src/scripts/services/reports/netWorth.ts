angular.module('financier').factory('netWorth', () => {
  return function generateReport(transactions: any) {
    const data: any = [];

    // Play safe, kids
    transactions.sort((a: any, b: any) => {
      return a.date - b.date;
    });

    transactions.forEach((transaction: any) => {
      if (data.length === 0) {
        data.push({
          date: transaction.date,
          accounts: {}
        });
      } else {
        let month = data[data.length - 1].date;

        while (!isSameMonth(data[data.length - 1].date, transaction.date)) {
          month = nextMonth(month);

          data.push({
            date: month,
            accounts: angular.copy(data[data.length - 1].accounts)
          });
        }
      }

      if (!angular.isDefined(data[data.length - 1].accounts[transaction.account])) {
        data[data.length - 1].accounts[transaction.account] = 0;
      }

      data[data.length - 1].accounts[transaction.account] += transaction.value;
    });

    const months: any = [],
      assets: any = [],
      debt: any = [],
      netWorth: any = [];

    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
    data.forEach(d => {
      months.push(d.date);

      let monthDebt = 0,
        monthAssets = 0,
        monthNetWorth = 0;

      for (const accountId in d.accounts) {
        if (d.accounts.hasOwnProperty(accountId)) {
          if (d.accounts[accountId] > 0) {
            monthAssets += d.accounts[accountId];
          } else {
            monthDebt += Math.abs(d.accounts[accountId]);
          }

          monthNetWorth += d.accounts[accountId];
        }
      }

      assets.push(monthAssets);
      debt.push(monthDebt);
      netWorth.push(monthNetWorth);
    });

    return {
      assets,
      debt,
      netWorth,
      months
    };

  };

  function isSameMonth(a: any, b: any) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth()
    );
  }

  function nextMonth(month: any) {
    return new Date(month.getFullYear(), month.getMonth() + 1, 1);
  }
});
