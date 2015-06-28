(function() {
  'use strict';

  angular
    .module('resources')
    .factory('ResourceIndependent', ResourceIndependent);

  ResourceIndependent.$inject = ['$resource', 'ENV'];

  function ResourceIndependent($resource, ENV) {
    return $resource(ENV.apiEndpoint + 'api/independents/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();