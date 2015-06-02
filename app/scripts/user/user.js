(function() {
  'use strict';

  angular
  .module('mobileApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('app.register', {
      url: '/register',
      views: {
        'screen': {
          templateUrl: 'templates/user/register.html',
          controller: 'OneUserCtrl as vm' // controllerAs does not work with ionic
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'screen': {
          templateUrl: 'templates/user/login.html',
          controller: 'OneUserCtrl as vm' // controllerAs does not work with ionic
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'screen': {
          templateUrl: 'templates/user/settings.html',
          controller: 'OneUserCtrl as vm' // controllerAs does not work with ionic
        }
      }
    })
    .state('app.password', {
      url: '/password',
      views: {
        'screen': {
          templateUrl: 'templates/user/password.html',
          controller: 'OneUserCtrl as vm' // controllerAs does not work with ionic
        }
      }
    });
  }
})();
