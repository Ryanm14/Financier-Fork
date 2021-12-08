// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'char... Remove this comment to see the full error message
import Chart from 'chart.js';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').directive('netWorthChart', ($filter, netWorth, $translate) => {
  const intCurrency = $filter('intCurrency');

  function capitalize(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return {
    restrict: 'E',
    template: '<canvas></canvas>',
    scope: {
      transactions: '='
    },
    replace: true,
    link: (scope, element) => {
      scope.$watch('transactions', transactions => {
        if (transactions) {
          generateReport();
        }
      });

      function getCurrencyValue(intVal: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
        return intCurrency(intVal, true, scope.$parent.dbCtrl.currencyDigits);
      }

      function generateReport() {
        const currency = $filter('currency'),
          dateFilter = $filter('date'),
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transactions' does not exist on type 'IS... Remove this comment to see the full error message
          report = netWorth(scope.transactions);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContext' does not exist on type 'HTML... Remove this comment to see the full error message
        var ctx = element[0].getContext('2d');

        var barChartData = {
          labels: report.months,
          datasets: [{
            label: $translate.instant('NET_WORTH'),
            type: 'line',
            tension: 0,
            data: report.netWorth.map((amt: any) => getCurrencyValue(amt)),
            fill: false,
            borderWidth: 1,
            borderColor: '#888',
            radius: 0,
            yAxisID: 'y-axis-1'
          }, {
            label: $translate.instant('NET_WORTH'),
            type: 'line',
            borderColor: 'rgba(0, 0, 0, 0)',
            tension: 0,
            data: report.netWorth.map((amt: any) => getCurrencyValue(amt)),
            fill: true,
            radius: 0,
            backgroundColor: 'rgba(255, 255, 0, 0.1)',
            yAxisID: 'y-axis-1'
          }, {
            type: 'bar',
            label: $translate.instant('DEBTS'),
            data: report.debt.map((amt: any) => getCurrencyValue(amt)),
            fill: false,
            backgroundColor: '#ff4c4c',
            borderColor: '#ff4c4c',
            hoverBackgroundColor: '#ff4c4c',
            hoverBorderColor: '#ff4c4c',
            yAxisID: 'y-axis-1'
          }, {
            type: 'bar',
            label: $translate.instant('ASSETS'),
            data: report.assets.map((amt: any) => getCurrencyValue(amt)),
            fill: false,
            backgroundColor: '#93c776',
            borderColor: '#93c776',
            hoverBackgroundColor: '#93c776',
            hoverBorderColor: '#93c776',
            yAxisID: 'y-axis-1'
          }]
        };

        new Chart(ctx, {
          type: 'bar',
          data: barChartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              mode: 'label',
                callbacks: {
                  label: function (tooltipItems: any, data: any) {
                    if (tooltipItems.datasetIndex === 1) {
                      return;
                    }

                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
                    return data.datasets[tooltipItems.datasetIndex].label + ': ' + currency(tooltipItems.yLabel, scope.$parent.dbCtrl.currencySymbol, scope.$parent.dbCtrl.currencyDigits);
                  }
                }
            },
            legend: {
              display: false
            },
            elements: {
              line: {
                fill: false
              }
            },
            scales: {
              xAxes: [{
                display: true,
                gridLines: {
                  display: false
                },
                labels: {
                  show: true,
                },
                ticks: {
                  callback: (date: any) => {
                    return capitalize(dateFilter(date, 'MMM \'\'yy'));
                  }
                }
              }],
              yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                gridLines: {
                  display: true
                },
                labels: {
                  show: true
                },
                ticks: {
                  beginAtZero: true,
                  callback: (amount: any) => {
                    return currency(
                      amount,
                      // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
                      scope.$parent.dbCtrl.currencySymbol,
                      // @ts-expect-error ts-migrate(2339) FIXME: Property 'dbCtrl' does not exist on type 'IScope'.
                      scope.$parent.dbCtrl.currencyDigits
                    );
                  }
                }
              }]
            }
          }
        });
      }
    }
  };
});
