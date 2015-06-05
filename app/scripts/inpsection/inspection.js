(function() {
  'use strict';

  angular
  .module('mobileApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('app.inspectionUser', {
      url: '/inspection/user',
      views: {
        screen: {
          templateUrl: 'templates/inspection/user.html',
          controller: 'ManyInspectionsCtrl as vm' // controllerAs does not work with ionic
        }
      }
    })
    .state('app.inspectionCompany', {
      url: '/inspection/company',
      views: {
        screen: {
          templateUrl: 'templates/inspection/company.html',
          controller: 'ManyInspectionsCtrl as vm' // controllerAs does not work with ionic
        }
      }
    })
    .state('app.inspectionDetail', {
      url: '/inspection/detail/:id',
      views: {
        screen: {
          templateUrl: 'templates/inspection/detail.html',
          controller: 'OneInspectionCtrl as vm' // controllerAs does not work with ionic
        }
      }
    });
  }
})();
