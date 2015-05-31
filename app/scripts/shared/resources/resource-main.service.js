(function() {
  'use strict';

  angular
  .module('resources')
  .factory('ResourceMain', ResourceMain);

  ResourceMain.$inject = ['$resource', 'ENV'];

  function ResourceMain($resource, ENV) {
    return $resource(ENV.apiEndpoint+'/api/mains/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
