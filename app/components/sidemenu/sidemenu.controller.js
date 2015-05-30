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
        new SidemenuItem('Example', 'app.example'),
        new SidemenuItem(),
        new SidemenuItem(),
        new SidemenuItem(),
        new SidemenuItem()
      ];
    }
  }
})();
