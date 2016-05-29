
(function() {

    'use strict';

    angular
        .module('tmApp')
        .controller('AuthController', AuthController);


    function AuthController($scope, $rootScope, $auth, $state, $localStorage) {

        $scope.login = function() {
            var credentials = {
                email: $scope.email,
                password: $scope.password
            }
            $auth.login(credentials).then(function(response) {
                $localStorage.user = response.data.user;
                $rootScope.user = $localStorage.user;
                $state.go('tasks');
            }, function(error) {
                $scope.loginError = true;
                $scope.loginErrorText = error.data.error;
            });
        }

        $scope.signup = function() {
            var credentials = {
                email: $scope.email,
                password: $scope.password
            }
            $auth.signup(credentials).then(function(response) {
                $auth.setToken(response.data.token);
                $localStorage.user = response.data.user;
                $rootScope.user = $localStorage.user;
                $state.go('tasks');
            }, function(error) {
                $scope.signupError = true;
                $scope.signupErrorText = error.data.error;
            });
        }

    }

})();