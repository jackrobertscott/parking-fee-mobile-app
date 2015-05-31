(function() {
  'use strict';

  angular
  .module('dataServices')
  .factory('dataLocation', dataLocation);

  dataLocation.$inject = ['ResourceLocation'];

  function dataLocation(ResourceLocation) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove,
      getCompanyLocations: getCompanyLocations
    };

    return service;

    function getOne(id) {
      return ResourceLocation.get({id: id}).$promise;
    }

    function getMany() {
      return ResourceLocation.query().$promise;
    }

    function create(body) {
      var object = new ResourceLocation(body);
      return object.$save();
    }

    function update(body) {
      var object = new ResourceLocation(body);
      return object.$update();
    }

    function remove(body) {
      var object = new ResourceLocation(body);
      return object.$remove();
    }

    function getCompanyLocations(id) {
      return ResourceLocation.getCompanyLocations({id: id}).$promise;
    }
  }
})();
