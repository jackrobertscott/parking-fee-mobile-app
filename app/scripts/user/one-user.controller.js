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

    activate();

    function activate() {
      // code...
    }

    function getOne(id) {
      vm.glitch.reset();
      id = id || Auth.getCurrentUser()._id;
      dataUser.getOne(id)
      .then(function(user) {
        vm.user = user;
      })
      .catch(vm.glitch.handle);
    }

    function create() {
      vm.glitch.reset();
      Auth.createUser(vm.user)
      .then(function(){
        $state.go('app.example');
      })
      .catch(vm.glitch.handle);
    }

    function login() {
      vm.glitch.reset();
      Auth.login(vm.user)
      .then(function(){
        $state.go('app.example');
      })
      .catch(vm.glitch.handle);
    }

    function changePassword() {
      vm.glitch.reset();
      Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
      .then(function(){
        $state.go('app.example');
      })
      .catch(vm.glitch.handle);
    }

    function update() {
      vm.glitch.reset();
      dataUser.update(vm.user)
      .then(function() {
        $state.go('app.example');
      })
      .catch(vm.glitch.handle);
    }
  }
})();
