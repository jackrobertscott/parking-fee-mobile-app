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
          templateUrl: 'components/template/template.html',
          controller: 'TemplateCtrl'
        }
      }
    });
  }
})();
