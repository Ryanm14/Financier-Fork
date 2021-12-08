angular.module('financier').factory('offline', ($rootScope: any) => {
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
  const runtime = require('offline-plugin/runtime');

  function install() {
    runtime
    .install({
      onInstalled: () => {
        $rootScope.$broadcast('offlineStatus', 'refresh');
      },
      onUpdateFailed: () => {
        $rootScope.$broadcast('serviceWorker', 'error');
      },
      onUpdateReady: () => {
        $rootScope.$broadcast('serviceWorker:updateReady');
      },
      onUpdated: () => {
        $rootScope.$broadcast('serviceWorker:updated');
      }
    });
  }

  return {
    install,
    applyUpdate: runtime.applyUpdate
  };

});
