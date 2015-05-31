(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$state', 'tracto', 'Auth', 'dataUser'];

  function UserCtrl($state, tracto, Auth, dataUser) {
    var vm = this;

    vm.tracto = tracto;
    vm.user = {};
    vm.register = register;
    vm.login = login;
    vm.changePassword = changePassword;
    vm.update = update;

    activate();

    function activate() {
      // code...
    }

    function getOne(id) {
      vm.tracto.reset();
      id = id || Auth.getCurrentUser()._id;
      dataUser.getOne(id)
      .then(function(item) {
        vm.item = item;
      })
      .catch(vm.tracto.handle);
    }

    function register() {
      vm.tracto.reset();
      Auth.createUser(vm.user)
      .then(function(){
        $state.go('app.example');
      })
      .catch(vm.tracto.handle);
    }

    function login() {
      vm.tracto.reset();
      Auth.login(vm.user)
      .then(function(){
        $state.go('app.example');
      })
      .catch(vm.tracto.handle);
    }

    function changePassword() {
      vm.tracto.reset();
      Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
      .then(function(){
        $state.go('app.example');
      })
      .catch(vm.tracto.handle);
    }

    function update() {
      vm.tracto.reset();
      dataUser.update(vm.user)
      .then(function() {
        $state.go('app.example');
      })
      .catch(vm.tracto.handle);
    }
  }
})();
