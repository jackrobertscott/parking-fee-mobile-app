(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('OneInspectionCtrl', OneInspectionCtrl);

  OneInspectionCtrl.$inject = ['dataInspection', 'glitch', '$state', '$stateParams', 'Auth'];

  function OneInspectionCtrl(dataInspection, glitch, $state, $stateParams, Auth) {
    var vm = this;

    vm.inspection = {};
    vm.glitch = glitch;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getOne(id) {
      id = id || $stateParams.id;
      dataInspection.getOne(id)
      .then(function(inspection) {
        vm.inspection = inspection;
      })
      .catch(vm.glitch.handle);
    }

    function create(form) {
      var user = Auth.getCurrentUser();
      angular.extend(vm.inspection, {
        _creator: user._id,
        company: user.company
      });
      dataInspection.create(vm.inspection)
      .then(function(inspection) {
        $state.go('inspection');
      })
      .catch(vm.glitch.handle);
    }

    function update(form) {
      dataInspection.update(vm.inspection)
      .then(function(inspection) {
        vm.glitch.setSuccess('Successfully updated');
      })
      .catch(vm.glitch.handle);
    }

    function remove(form) {
      dataInspection.remove(vm.inspection)
      .then(function() {
        vm.inspection = {};
        $state.go('inspection');
      })
      .catch(vm.glitch.handle);
    }
  }
})();
