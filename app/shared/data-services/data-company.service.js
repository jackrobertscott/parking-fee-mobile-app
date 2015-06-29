(function() {
  'use strict';

  angular
    .module('dataServices')
    .factory('dataCompany', dataCompany);

  dataCompany.$inject = ['ResourceCompany'];

  function dataCompany(ResourceCompany) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceCompany.get({
        id: id
      }).$promise;
    }

    function getMany() {
      return ResourceCompany.query().$promise;
    }

    function create(body) {
      var object = new ResourceCompany(body);
      return object.$save();
    }

    function update(body) {
      var object = new ResourceCompany(body);
      return object.$update();
    }

    function remove(body) {
      var object = new ResourceCompany(body);
      return object.$remove();
    }
  }
})();