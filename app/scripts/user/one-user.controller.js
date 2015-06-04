(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('OneUserCtrl', OneUserCtrl);

  OneUserCtrl.$inject = ['$state', 'glitch', 'Auth', 'dataUser'];

  function OneUserCtrl($state, glitch, Auth, dataUser) {
    var vm = this;

    vm.glitch = glitch;
    vm.user = {};
    vm.getOne = getOne;
    vm.create = create;
    vm.login = login;
    vm.changePassword = changePassword;
    vm.update = update;
    vm.logout = logout;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getOne(id) {
      id = id || Auth.getCurrentUser()._id;
      dataUser.getOne(id)
      .then(function(user) {
        vm.user = user;
      })
      .catch(vm.glitch.handle);
    }

    function create() {
      Auth.createUser(vm.user)
      .then(function(){
        $state.go('app.userSettings');
      })
      .catch(vm.glitch.handle);
    }

    function login() {
      Auth.login(vm.user)
      .then(function(){
        $state.go('app.userSettings');
      })
      .catch(vm.glitch.handle);
    }

    function changePassword() {
      Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
      .then(function(){
        $state.go('app.userSettings');
      })
      .catch(vm.glitch.handle);
    }

    function update() {
      dataUser.update(vm.user)
      .then(function() {
        $state.go('app.vehicleUser');
      })
      .catch(vm.glitch.handle);
    }

    function logout() {
      Auth.logout();
      $state.go('app.userLogin');
    }
  }
})();
