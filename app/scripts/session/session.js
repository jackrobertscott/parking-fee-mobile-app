(function() {
  'use strict';

  angular
    .module('mobileApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.sessionUser', {
        cache: false,
        url: '/session/user',
        views: {
          screen: {
            templateUrl: 'templates/session/user.html',
            controller: 'ManySessionsCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      })
      .state('app.sessionStart', {
        cache: false,
        url: '/session/start',
        views: {
          screen: {
            templateUrl: 'templates/session/start.html',
            controller: 'OneSessionCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      })
      .state('app.sessionEnd', {
        cache: false,
        url: '/session/end/:id',
        views: {
          screen: {
            templateUrl: 'templates/session/end.html',
            controller: 'OneSessionCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      })
      .state('app.sessionDetail', {
        cache: false,
        url: '/session/detail/:id',
        views: {
          screen: {
            templateUrl: 'templates/session/detail.html',
            controller: 'OneSessionCtrl as vm' // controllerAs does not work with ionic
          }
        },
        data: {
          role: 'user'
        }
      });
  }
})();
