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
        direction: 'register',
        maxRole: 'guest',
        data: {
          icon: 'ion-person-add'
        }
      });
      menu.addItem({
        label: 'Login',
        direction: 'login',
        maxRole: 'guest',
        data: {
          icon: 'ion-log-in'
        }
      });
      menu.addItem({
        label: 'Park',
        direction: 'app.sessionStart',
        minRole: 'user',
        data: {
          icon: 'ion-map'
        }
      });
      menu.addItem({
        label: 'Profile',
        direction: 'app.userSettings',
        minRole: 'user',
        data: {
          icon: 'ion-person'
        }
      });
      menu.addItem({
        label: 'Vehicles',
        direction: 'app.vehicleUser',
        minRole: 'user',
        data: {
          icon: 'ion-android-car'
        }
      });
      menu.addItem({
        label: 'Sessions',
        direction: 'app.sessionUser',
        minRole: 'user',
        data: {
          icon: 'ion-calendar'
        }
      });
      menu.addItem({
        label: 'Logout',
        direction: 'app.userLogout',
        minRole: 'user',
        data: {
          icon: 'ion-log-out'
        }
      });
      return menu.getItems();
    }
  }
})();
