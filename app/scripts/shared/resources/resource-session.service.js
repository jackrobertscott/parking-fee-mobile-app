(function() {
  'use strict';

  angular
  .module('resources')
  .factory('ResourceSession', ResourceSession);

  ResourceSession.$inject = ['$resource', 'ENV'];

  function ResourceSession($resource, ENV) {
    return $resource(ENV.apiEndpoint+'/api/sessions/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getFewUser: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'user'
        }
      }
    });
  }
})();
