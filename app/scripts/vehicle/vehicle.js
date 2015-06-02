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
          templateUrl: 'templates/vehicle/register.html',
          controller: 'VehicleCtrl as vm' // controllerAs does not work with ionic
        }
      }
    });
  }
})();
