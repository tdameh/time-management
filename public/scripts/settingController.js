(function() {

    'use strict';

    angular
        .module('tmApp')
        .controller('SettingController', SettingController);

    function SettingController($scope, $rootScope, User, Notification) {
        $scope.working_hours = $rootScope.user.working_hours;
        $scope.update = function() {
            User.update({id: $rootScope.user.id}, {working_hours: $scope.working_hours})
                .$promise.then(function(response){
                    $rootScope.user.working_hours = $scope.working_hours;
                    Notification.success('Updated Successfully');
                });
        }
    }
    
})();