(function() {
  'use strict';

  angular
  .module('resources')
  .factory('ResourceVehicle', ResourceVehicle);

  ResourceVehicle.$inject = ['$resource', 'ENV'];

  function ResourceVehicle($resource, ENV) {
    return $resource(ENV.apiEndpoint+'api/vehicles/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getUserVehicles: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'user'
        }
      }
    });
  }
})();
