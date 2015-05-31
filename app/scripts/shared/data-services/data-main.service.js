(function() {
  'use strict';

  angular
  .module('dataServices')
  .factory('dataMain', dataMain);

  dataMain.$inject = ['ResourceMain'];

  function dataMain(ResourceMain) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceMain.get({id: id}).$promise;
    }

    function getMany() {
      return ResourceMain.query().$promise;
    }

    function create(body) {
      var object = new ResourceMain(body);
      return object.$save();
    }

    function update(body) {
      var object = new ResourceMain(body);
      return object.$update();
    }

    function remove(body) {
      var object = new ResourceMain(body);
      return object.$remove();
    }
  }
})();
