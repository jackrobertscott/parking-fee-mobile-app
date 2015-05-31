(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('SidemenuCtrl', SidemenuCtrl);

  SidemenuCtrl.$inject = ['$scope', 'SidemenuItem'];

  function SidemenuCtrl($scope, SidemenuItem) {
    var vm = this;

    vm.sidemenu = [];

    activate();

    function activate() {
      vm.sidemenu = sidemenu();
    }

    function sidemenu() {
      return [
        new SidemenuItem('Register', 'app.register'),
        new SidemenuItem('Login', 'app.login'),
        new SidemenuItem('Change Password', 'app.password'),
        new SidemenuItem('Example', 'app.example'),
        new SidemenuItem()
      ];
    }
  }
})();
