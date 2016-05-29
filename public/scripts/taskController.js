(function() {

    'use strict';

    angular
        .module('tmApp')
        .controller('TaskController', TaskController);

    function TaskController($scope, $rootScope, Task, Notification) {
        $rootScope.getUsers();
        $scope.task = new Task();
        $scope.tasks = Task.query();
        $scope.action = "Add";

        $scope.save = function() {
            if ($scope.task.id) {
                Task.update({id: $scope.task.id}, $scope.task)
                    .$promise.then(function(response){
                        Notification.success('Updated Successfully');
                    });
            } else {
                $scope.task.$save(function(response) {
                    $scope.tasks.push(response);
                    Notification.success('Saved Successfully');
                });
            }

            $scope.action = "Add";
            $scope.task = new Task();
        }

        $scope.activeTask = function(task) {
            $scope.task = task;
            $scope.action = "Update";
        }

        $scope.delete = function(task) {
            Task.delete(task).$promise.then(function(response){
                _.remove($scope.tasks, task);
                Notification.success('Deleted Successfully');
            });
        }
    }
    
})();