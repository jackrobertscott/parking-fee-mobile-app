(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$state'];

  function UserCtrl($state) {
    var vm = this;

    vm.user = {};
    vm.register = register;
    vm.login = login;
    vm.changePassword = changePassword;
    vm.update = update;

    activate();

    function activate() {
      // code...
    }

    function register() {
      $state.go('app.example');
      // code...
    }

    function login() {
      $state.go('app.example');
      // code...
    }

    function changePassword() {
      $state.go('app.example');
      // code...
    }

    function update() {
      $state.go('app.example');
      // code...
    }
  }
})();
