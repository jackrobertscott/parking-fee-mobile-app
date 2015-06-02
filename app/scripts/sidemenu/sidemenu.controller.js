(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('SidemenuCtrl', SidemenuCtrl);

  SidemenuCtrl.$inject = ['$scope', 'SidemenuItem', 'Auth', 'menu'];

  function SidemenuCtrl($scope, SidemenuItem, Auth, menu) {
    var vm = this;

    vm.sidemenu = [];

    activate();

    function activate() {
      vm.sidemenu = createMenu();
    }

    function createMenu() {
      menu.addItem({label: 'Register', direction: 'app.register', maxRole: 'guest'});
      menu.addItem({label: 'Login', direction: 'app.login', maxRole: 'guest'});
      menu.addItem({label: 'Profile', direction: 'app.settings', minRole: 'user'});
      menu.addItem({label: 'Change Password', direction: 'app.password', minRole: 'user'});
      menu.addItem({label: 'Example', direction: 'app.example'});
      menu.addItem({label: 'Logout', action: Auth.logout, minRole: 'user'});
      return menu.getItems();
    }
  }
})();
