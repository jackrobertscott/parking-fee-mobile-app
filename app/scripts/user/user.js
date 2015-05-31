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
          controller: 'UserCtrl' // controllerAs does not work with ionic
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'screen': {
          templateUrl: 'templates/user/login.html',
          controller: 'UserCtrl' // controllerAs does not work with ionic
        }
      }
    })
    .state('app.password', {
      url: '/password',
      views: {
        'screen': {
          templateUrl: 'templates/user/password.html',
          controller: 'UserCtrl' // controllerAs does not work with ionic
        }
      }
    });
  }
})();
