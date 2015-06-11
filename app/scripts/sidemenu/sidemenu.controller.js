(function() {
  'use strict';

  angular
    .module('mobileApp')
    .controller('SidemenuCtrl', SidemenuCtrl);

  SidemenuCtrl.$inject = ['$scope', 'Auth', 'menu'];

  function SidemenuCtrl($scope, Auth, menu) {
    var vm = this;

    vm.sidemenu = [];

    ////////////

    activate();

    function activate() {
      vm.sidemenu = createMenu();
    }

    ////////////

    function createMenu() {
      menu.reset();
      menu.addItem({
        label: 'Register',
        direction: 'app.userRegister',
        maxRole: 'guest'
      });
      menu.addItem({
        label: 'Login',
        direction: 'app.userLogin',
        maxRole: 'guest'
      });
      menu.addItem({
        label: 'Profile',
        direction: 'app.userSettings',
        minRole: 'user'
      });
      menu.addItem({
        label: 'Change Password',
        direction: 'app.userPassword',
        minRole: 'user'
      });
      menu.addItem({
        label: 'My Vehicles',
        direction: 'app.vehicleUser',
        minRole: 'user'
      });
      menu.addItem({
        label: 'New Vehicle',
        direction: 'app.vehicleRegister',
        minRole: 'user'
      });
      menu.addItem({
        label: 'Logout',
        direction: 'app.userLogout',
        minRole: 'user'
      });
      return menu.getItems();
    }
  }
})();