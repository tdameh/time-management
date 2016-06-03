(function() {

    'use strict';

    angular
        .module('tmApp')
        .controller('TaskController', TaskController);

    function TaskController($scope, $rootScope, Task, Notification, $state) {
        $rootScope.getUsers();
        $scope.task = new Task();
        $scope.action = "Add";

        Task.query().$promise.then(function (response) {
            $scope.tasks = response;
            $scope.activeTasks = response;
            $scope.dayStatus();
            $scope.filter();
        });
        $scope.save = function() {
            if ($scope.task.id) {
                Task.update({id: $scope.task.id}, $scope.task)
                    .$promise.then(function(response){
                        Notification.success('Updated Successfully');
                        $scope.dayStatus();
                    });
            } else {
                $scope.task.$save(function(response) {
                    $scope.tasks.push(response);
                    $scope.filter();
                    Notification.success('Saved Successfully');
                    $scope.dayStatus();
                });
            }

            $scope.action = "Add";
            $scope.task = new Task();
        }

        $scope.delete = function(task) {
            Task.delete(task).$promise.then(function(response){
                _.remove($scope.activeTasks, task);
                _.remove($scope.tasks, task);
                Notification.success('Deleted Successfully');
                $scope.dayStatus();
            });
        }

        $scope.activeTask = function(task) {
            $scope.task = task;
            $scope.action = "Update";
        }

        $scope.export = function() {
            $scope.filter();
            $rootScope.activeTasks = $scope.activeTasks;
            $rootScope.startDate = $scope.startDate;
            $rootScope.endDate = $scope.endDate;
            $rootScope.userFilter = $scope.userFilter;
            $state.go('export');
        }

        $scope.filter = function() {
            var activeTasks = [];
            $scope.activeTasks = [];
            if ($scope.startDate && $scope.endDate) {
                _.forEach($scope.tasks, function(task) {
                    if (task.date >= $scope.startDate && task.date <= $scope.endDate) {
                        activeTasks.push(task);
                    }
                });
            } else if ($scope.startDate) {
                _.forEach($scope.tasks, function(task) {
                    if (task.date >= $scope.startDate) {
                        activeTasks.push(task);
                    }
                });
            } else if ($scope.endDate) {
                _.forEach($scope.tasks, function(task) {
                    if (task.date <= $scope.endDate) {
                        activeTasks.push(task);
                    }
                });
            } else {
                activeTasks = $scope.tasks;
            }

            if ($scope.userFilter && $scope.userFilter != 'all') {
                _.forEach(activeTasks, function(task) {
                    if (task.user.email == $scope.userFilter) {
                        $scope.activeTasks.push(task);
                    }
                });
            } else {
                $scope.activeTasks = activeTasks;
            }
        }

        $scope.dayStatus = function() {
            console.log($rootScope.users);
            var result = [];
            _.forEach($scope.tasks, function(task) {
                if(task.user) {
                    var t = _.find(result, {user:task.user.id, date: task.date});
                    if (t) {
                        t.hours += task.hours;
                    } else {
                        result.push({user:task.user.id, date: task.date, hours:task.hours});
                    }
                } else {
                    var t = _.find(result, {date: task.date});
                    if (t) {
                        t.hours += task.hours;
                    } else {
                        result.push({date: task.date, hours:task.hours});
                    }
                }
            });

            _.forEach($scope.tasks, function(task) {
                var t = _.find(result, {date: task.date});
                if (t.user) {
                    var u = _.find($rootScope.users, {id: t.user});
                    if (t.hours < u.working_hours) {
                        task.class = 'text-danger';
                    } else {
                        task.class = 'text-success';
                    }
                } else {
                    if (t.hours < $rootScope.user.working_hours) {
                        task.class = 'text-danger';
                    } else {
                        task.class = 'text-success';
                    }
                }
            });
        }
    }
    
})();