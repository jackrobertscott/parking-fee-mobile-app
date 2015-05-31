(function() {
  'use strict';

  angular
  .module('resources')
  .factory('ResourceUser', ResourceUser);

  ResourceUser.$inject = ['$resource', 'ENV'];

  function ResourceUser($resource, ENV) {
    return $resource(ENV.apiEndpoint+'/api/users/:id/:action', {
      id: '@_id'
    }, {
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      update: {
        method: 'PUT'
      },
      changePassword: {
        method: 'PUT',
        params: {
          action: 'password'
        }
      },
      getCompanyMembers: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'company'
        }
      },
      addCompanyMember: {
        method: 'POST',
        params: {
          action: 'company'
        }
      },
      removeCompanyMember: {
        method: 'DELETE',
        params: {
          action: 'company'
        }
      }
    });
  }
})();
