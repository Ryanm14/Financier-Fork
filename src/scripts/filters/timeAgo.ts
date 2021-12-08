import moment from 'moment';

// @ts-expect-error ts-migrate(2686) FIXME: 'angular' refers to a UMD global, but the current ... Remove this comment to see the full error message
angular.module('financier').filter('timeAgo', function ($interval) {
   // trigger digest every 20 seconds
   $interval(function () {}, 20);

   function fromNowFilter(time: any) {
     return moment(time).fromNow();
   }

   fromNowFilter.$stateful = true;
   return fromNowFilter;
 });
