import moment from 'moment';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').controller('heatMapCtrl', function(this: any, $scope, $rootScope, $state, $translate, $filter) {
  const dateFilter = $filter('date');

  this.heatMapData = [];

  const minYear = Math.min(...$scope.dbCtrl.manager.allAccounts.transactions.map((t: any) => t.date.getFullYear()));
  const currentYear = new Date().getFullYear();

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-3 arguments, but got 0.
  this.years = Array(currentYear - minYear + 1).fill().map((_, i) => {
    const year = moment().year(currentYear - i).endOf('year').toDate();

    return {
      label: dateFilter(year, 'yyyy'),
      value: year
    };
  });

  this.years.unshift({
    label: $translate.instant('LAST_12_MONTHS'),
    value: new Date()
  });

  this.selectedYear = this.years[0];

  $scope.$watch(() => $scope.reportCtrl.transactions, (transactions: any) => {
    this.inflowHeat = generateHeatMapValues(transactions.filter((t: any) => {
      return t.value > 0 && !t.transfer;
    }));

    this.outflowHeat = generateHeatMapValues(transactions.filter((t: any) => {
      return t.value < 0 && !t.transfer;
    }));
  });

  function generateHeatMapValues(transactions: any) {
    const heatMapTmp = {}, heatMapData = [];

    transactions.forEach((t: any) => {
      const key = moment(t.date).format('YYYY-MM-DD');
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!heatMapTmp[key]) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        heatMapTmp[key] = 0;
      }

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      heatMapTmp[key] += t.value;
    });

    for (let key in heatMapTmp) {
      heatMapData.push({
        date: key,
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        count: heatMapTmp[key]
      });
    }

    return heatMapData;
  }
});
