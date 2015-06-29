(function() {
  'use strict';

  angular
    .module('resources')
    .factory('ResourceInfringement', ResourceInfringement);

  ResourceInfringement.$inject = ['$resource', 'ENV'];

  function ResourceInfringement($resource, ENV) {
    return $resource(ENV.apiEndpoint + 'api/infringements/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getFewCompany: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'company'
        }
      }
    });
  }
})();