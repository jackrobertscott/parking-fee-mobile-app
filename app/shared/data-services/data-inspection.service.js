(function() {
  'use strict';

  angular
  .module('dataServices')
  .factory('dataInspection', dataInspection);

  dataInspection.$inject = ['ResourceInspection'];

  function dataInspection(ResourceInspection) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove,
      getUserInfringed: getUserInfringed,
      getFewCompany: getFewCompany
    };

    return service;

    function getOne(id) {
      return ResourceInspection.get({id: id}).$promise;
    }

    function getMany() {
      return ResourceInspection.query().$promise;
    }

    function create(body) {
      var object = new ResourceInspection(body);
      return object.$save();
    }

    function update(body) {
      var object = new ResourceInspection(body);
      return object.$update();
    }

    function remove(body) {
      var object = new ResourceInspection(body);
      return object.$remove();
    }

    function getUserInfringed(id) {
      return ResourceInspection.getUserInfringed({id: id}).$promise;
    }

    function getFewCompany(id) {
      return ResourceInspection.getFewCompany({id: id}).$promise;
    }
  }
})();
