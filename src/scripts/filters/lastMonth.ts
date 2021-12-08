import moment from 'moment';

// We store currency as int -- $1.50 = 150
// Divide by 100

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').filter('lastMonth', () => {
  return (date: any) => {
    return moment(date).subtract(1, 'month').toDate();
  };
});
