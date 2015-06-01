(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('SidemenuCtrl', SidemenuCtrl);

  SidemenuCtrl.$inject = ['$scope', 'SidemenuItem', 'Auth'];

  function SidemenuCtrl($scope, SidemenuItem, Auth) {
    var vm = this;

    vm.sidemenu = [];

    activate();

    function activate() {
      vm.sidemenu = getSidemenu();
    }

    function getSidemenu() {
      return [
        new SidemenuItem('Register', 'app.register'),
        new SidemenuItem('Login', 'app.login'),
        new SidemenuItem('Change Password', 'app.password'),
        new SidemenuItem('Example', 'app.example'),
        new SidemenuItem('Logout', null, Auth.logout)
      ];
    }
  }
})();
