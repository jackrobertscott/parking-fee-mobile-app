(function() {
  'use strict';

  angular
    .module('mobileApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.vehicleUser', {
        cache: false,
        url: '/vehicle/user',
        views: {
          screen: {
            templateUrl: 'templates/vehicle/user.html',
            controller: 'ManyVehiclesCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      })
      .state('app.vehicleRegister', {
        url: '/vehicle/register',
        views: {
          screen: {
            templateUrl: 'templates/vehicle/register.html',
            controller: 'OneVehicleCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      })
      .state('app.vehicleSettings', {
        url: '/vehicle/settings/:id',
        views: {
          screen: {
            templateUrl: 'templates/vehicle/settings.html',
            controller: 'OneVehicleCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      });
  }
})();
