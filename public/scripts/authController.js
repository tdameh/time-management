
(function() {

    'use strict';

    angular
        .module('tmApp')
        .controller('AuthController', AuthController);


    function AuthController($auth, $state, $localStorage, $rootScope) {

        var vm = this;

        vm.loginError = false;
        vm.loginErrorText;

        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            }

            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function(response) {
                $localStorage.user = response.data.user;
                $rootScope.user = $localStorage.user;
                $state.go('tasks');
            }, function(error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;
            });
        }

    }

})();