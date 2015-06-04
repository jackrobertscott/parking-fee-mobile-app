(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('ManyInspectionsCtrl', ManyInspectionsCtrl);

  ManyInspectionsCtrl.$inject = ['dataInspection', 'glitch', 'Auth', '$state'];

  function ManyInspectionsCtrl(dataInspection, glitch, Auth, $state) {
    var vm = this;

    vm.inspections = [];
    vm.glitch = glitch;
    vm.getFewCompany = getFewCompany;
    vm.getUserInfringed = getUserInfringed;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getFewCompany() {
      vm.glitch.reset();
      dataInspection.getFewCompany(Auth.getCurrentUser().company)
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }

    function getUserInfringed() {
      vm.glitch.reset();
      dataInspection.getUserInfringed(Auth.getCurrentUser()._id)
      .then(function(inspections) {
        vm.inspections = inspections;
      })
      .catch(vm.glitch.handle);
    }

    function toDetails(item) {
      $state.go('app.inspectionDetail', {
        id: item._id
      });
    }
  }
})();
