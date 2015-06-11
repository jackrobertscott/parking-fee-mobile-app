(function() {
  'use strict';

  angular
    .module('mobileApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.userRegister', {
        url: '/user/register',
        views: {
          screen: {
            templateUrl: 'templates/user/register.html',
            controller: 'OneUserCtrl as vm' // controllerAs does not work with ionic
          }
        }
      })
      .state('app.userLogin', {
        url: '/user/login',
        views: {
          screen: {
            templateUrl: 'templates/user/login.html',
            controller: 'OneUserCtrl as vm' // controllerAs does not work with ionic
          }
        }
      })
      .state('app.userLogout', {
        url: '/user/logout',
        views: {
          screen: {
            templateUrl: 'templates/user/logout.html',
            controller: 'OneUserCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      })
      .state('app.userSettings', {
        url: '/user/settings',
        views: {
          screen: {
            templateUrl: 'templates/user/settings.html',
            controller: 'OneUserCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      })
      .state('app.userPassword', {
        url: '/user/password',
        views: {
          screen: {
            templateUrl: 'templates/user/password.html',
            controller: 'OneUserCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      });
  }
})();