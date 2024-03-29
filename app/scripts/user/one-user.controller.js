(function() {
  'use strict';

  angular
    .module('mobileApp')
    .controller('OneUserCtrl', OneUserCtrl);

  OneUserCtrl.$inject = ['$state', 'glitch', 'Auth', 'dataUser', '$ionicPopup', '$ionicPlatform', '$cordovaOauth'];

  function OneUserCtrl($state, glitch, Auth, dataUser, $ionicPopup, $ionicPlatform, $cordovaOauth) {
    var vm = this;

    vm.user = {};
    vm.glitch = glitch;
    vm.getOne = getOne;
    vm.create = create;
    vm.login = login;
    vm.changePassword = changePassword;
    vm.update = update;
    vm.logout = logout;
    vm.loginFacebook = loginFacebook;

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
        .then(function() {
          $state.go('app.userSettings');
        })
        .catch(vm.glitch.handle);
    }

    function login() {
      Auth.login(vm.user)
        .then(function() {
          $state.go('app.userSettings');
        })
        .catch(vm.glitch.handle);
    }

    function changePassword() {
      Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            template: 'Password updated'
          });
          vm.user = {};
        })
        .catch(vm.glitch.handle);
    }

    function update() {
      dataUser.update(vm.user)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            template: 'Profile updated'
          });
        })
        .catch(vm.glitch.handle);
    }

    function logout() {
      Auth.logout();
      $state.go('login');
    }

    function loginFacebook() {
      $ionicPlatform.ready(function() {
        $cordovaOauth.facebook('CLIENT_ID_HERE', ['email']).then(function(result) {
          // results
        }, function(error) {
          // error
        });
      });
    }
  }
})();
