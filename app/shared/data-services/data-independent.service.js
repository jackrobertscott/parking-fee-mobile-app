(function() {
  'use strict';

  angular
    .module('dataServices')
    .factory('dataIndependent', dataIndependent);

  dataIndependent.$inject = ['ResourceIndependent'];

  function dataIndependent(ResourceIndependent) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceIndependent.get({
        id: id
      }).$promise;
    }

    function getMany() {
      return ResourceIndependent.query().$promise;
    }

    function create(body) {
      var object = new ResourceIndependent(body);
      return object.$save();
    }

    function update(body) {
      var object = new ResourceIndependent(body);
      return object.$update();
    }

    function remove(body) {
      var object = new ResourceIndependent(body);
      return object.$remove();
    }
  }
})();
