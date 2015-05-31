(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$ionicModal'];

  function LoginCtrl($ionicModal) {
    var vm = this;

    vm.user = {};
    vm.login = login;
    vm.showLogin = vm.showLogin;
    vm.hideLogin = hideLogin;

    activate();

    function activate() {
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: vm
      }).then(function(modal) {
        vm.modal = modal;
      });
    }

    function login() {
      // login...
      vm.hideLogin();
    }

    function showLogin() {
      vm.modal.hide();
    }

    function hideLogin() {
      vm.modal.show();
    }
  }
})();
