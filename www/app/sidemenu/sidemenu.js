(function() {
  'use strict';

  angular
  .module('mobileApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/sidemenu/sidemenu.html',
      controller: 'AppCtrl'
    });
  }
})();
