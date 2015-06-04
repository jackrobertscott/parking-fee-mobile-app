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
      templateUrl: 'templates/sidemenu/sidemenu.html',
      controller: 'SidemenuCtrl as vm', // controllerAs does not work with ionic
      resolve: {
        currentUser: currentUser // load the user before loading controllers
      }
    });
  }

  currentUser.$inject = ['Auth'];

  function currentUser(Auth) {
    return Auth.getCurrentUser().$promise;
  }
})();
