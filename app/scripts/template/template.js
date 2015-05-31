(function() {
  'use strict';

  angular
  .module('mobileApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('app.example', {
      url: '/example',
      views: {
        'screen': {
          templateUrl: 'templates/template/template.html',
          controller: 'TemplateCtrl' // controllerAs does not work with ionic
        }
      }
    });
  }
})();
