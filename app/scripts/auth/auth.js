(function() {
  'use strict';

  angular
  .module('mobileApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('app.login', {
      url: '/login',
      views: {
        'screen': {
          templateUrl: 'templates/auth/login.html',
          controller: 'LoginCtrl' // controllerAs does not work with ionic
        }
      }
    });
  }
})();
