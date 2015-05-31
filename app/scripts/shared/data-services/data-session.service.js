(function() {
  'use strict';

  angular
  .module('dataServices')
  .factory('dataSession', dataSession);

  dataSession.$inject = ['ResourceSession'];

  function dataSession(ResourceSession) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove,
      getFewUser: getFewUser
    };

    return service;

    function getOne(id) {
      return ResourceSession.get({id: id}).$promise;
    }

    function getMany() {
      return ResourceSession.query().$promise;
    }

    function create(body) {
      var object = new ResourceSession(body);
      return object.$save();
    }

    function update(body) {
      var object = new ResourceSession(body);
      return object.$update();
    }

    function remove(body) {
      var object = new ResourceSession(body);
      return object.$remove();
    }

    function getFewUser(id) {
      return ResourceSession.getFewUser({id: id}).$promise;
    }
  }
})();
