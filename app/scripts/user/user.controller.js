(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = [];

  function UserCtrl() {
    var vm = this;

    vm.user = {};
    vm.register = register;
    vm.login = login;
    vm.changePassword = changePassword;

    activate();

    function activate() {
      // code...
    }

    function register() {
      // code...
    }

    function login() {
      // code...
    }

    function changePassword() {
      // code...
    }
  }
})();
