angular.module('financier').directive('fileRead', [function () {
    return {
        scope: {
            fileRead: '='
        },
        link: function (scope, element) {
            element.bind('change', function (changeEvent) {
                scope.$apply(function () {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fileRead' does not exist on type 'IScope... Remove this comment to see the full error message
                    scope.fileRead = changeEvent.target.files[0];
                    // or all selected files:
                    // scope.fileread = changeEvent.target.files;
                });
            });
        }
    };
}]);
