(function() {

    'use strict';

    angular
        .module('tmApp')
        .controller('ExportController', ExportController);

    function ExportController($scope, $rootScope) {
        console.log($rootScope.userFilter);
        $scope.totalHours = 0;
        _.forEach($rootScope.activeTasks, function(task) {
            $scope.totalHours += task.hours;
        });
    }
    
})();