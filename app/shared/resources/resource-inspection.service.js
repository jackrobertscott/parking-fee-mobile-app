(function() {
  'use strict';

  angular
  .module('resources')
  .factory('ResourceInspection', ResourceInspection);

  ResourceInspection.$inject = ['$resource', 'ENV'];

  function ResourceInspection($resource, ENV) {
    return $resource(ENV.apiEndpoint+'api/inspections/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getUserInfringed: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'user'
        }
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
