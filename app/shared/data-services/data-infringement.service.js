(function() {
  'use strict';

  angular
    .module('dataServices')
    .factory('dataInfringement', dataInfringement);

  dataInfringement.$inject = ['ResourceInfringement'];

  function dataInfringement(ResourceInfringement) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove,
      getFewCompany: getFewCompany
    };

    return service;

    function getOne(id) {
      return ResourceInfringement.get({
        id: id
      }).$promise;
    }

    function getMany() {
      return ResourceInfringement.query().$promise;
    }

    function create(body) {
      var object = new ResourceInfringement(body);
      return object.$save();
    }

    function update(body) {
      var object = new ResourceInfringement(body);
      return object.$update();
    }

    function remove(body) {
      var object = new ResourceInfringement(body);
      return object.$remove();
    }

    function getFewCompany(id) {
      return ResourceInfringement.getFewCompany({
        id: id
      }).$promise;
    }
  }
})();