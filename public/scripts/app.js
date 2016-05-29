(function() {

    'use strict';

    angular
        .module('tmApp', ['ui.router', 'satellizer', 'ngStorage', 'ngResource', 'datatables', 'ui-notification'])
        .factory('httpRequestInterceptor', httpRequestInterceptor)
        .config(moduleConfig)
        .run(moduleRun)
        .provider('Task', taskProvider)
        .provider('User', userProvider)

        function httpRequestInterceptor($q, $rootScope, $timeout) {
            return {
                responseError: function(rejection) {
                    $rootScope.error = rejection.data.error;
                    $timeout(function () {
                        $rootScope.error = false;
                    }, 2000);
                    return $q.reject(rejection);
                }
            };        
        }

        function moduleConfig($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, NotificationProvider) {
            $httpProvider.interceptors.push('httpRequestInterceptor');

            $authProvider.loginUrl = '/api/login';
            $urlRouterProvider.otherwise('/tasks');
            
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: '../views/login.html',
                    controller: 'AuthController as auth'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: '../views/signup.html',
                    controller: 'AuthController as auth'
                })
                .state('tasks', {
                    url: '/tasks',
                    templateUrl: '../views/tasks.html',
                    controller: 'TaskController as vm'
                })
                .state('settings', {
                    url: '/settings',
                    templateUrl: '../views/settings.html',
                    controller: 'SettingController as vm'
                });

            NotificationProvider.setOptions({
                delay: 3000,
                startTop: 40,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'right',
                positionY: 'top'
            });
        }

        function moduleRun($rootScope, $auth, $state, $localStorage, $http) {
            $rootScope.user = $localStorage.user;

            $rootScope.$on('$stateChangeStart', function (event, next) {
                // redirect to login page if not logged in
                if (next.name != 'login' && next.name != 'signup'  && !$auth.isAuthenticated()) {
                    event.preventDefault(); //prevent current page from loading
                    $state.go('login');
                }
            });

            $rootScope.logout = function() {
                $auth.logout().then(function(data) {
                    delete $localStorage.user;
                    $state.go('login');
                });
            }

            $rootScope.getUsers = function() {
                $http.get('/api/user').then(function(response){
                    $rootScope.users = response.data;
                });
            }
        }

        function taskProvider() {
            this.$get = ['$resource', function($resource) {
                var Task = $resource('/api/task/:id', {}, {
                    update: {
                        method: 'PUT'
                    }
                })

                return Task;
            }];
        }

        function userProvider() {
            this.$get = ['$resource', function($resource) {
                var User = $resource('/api/user/:id', {}, {
                    update: {
                        method: 'PUT'
                    }
                })

                return User;
            }];
        }
})();