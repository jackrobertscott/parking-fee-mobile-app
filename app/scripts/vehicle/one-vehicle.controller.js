(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('OneVehicleCtrl', OneVehicleCtrl);

  OneVehicleCtrl.$inject = ['dataVehicle', 'glitch', 'Auth', '$state', '$stateParams'];

  function OneVehicleCtrl(dataVehicle, glitch, Auth, $state, $stateParams) {
    var vm = this;

    var vehicle = {};
    vm.glitch = glitch;
    vm.getOne = getOne;
    vm.create = create;

    activate();

    function activate() {
      // code...
    }

    function getOne(id) {
      vm.glitch.reset();
      id = id || $stateParams.id;
      dataVehicle.getOne(id)
      .then(function(item) {
        vm.item = item;
      })
      .catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      // should: form validation check
      var user = Auth.getCurrentUser();
      angular.extend(vm.item, {
        _creator: user._id,
        users: [user._id]
      });
      dataVehicle.create(vm.item)
      .then(function(item) {
        $state.go('vehicleUser');
      })
      .catch(vm.glitch.handle);
    }

    function update(form) {
      vm.glitch.reset();
      dataVehicle.update(vm.item)
      .then(function(item) {
        vm.glitch.good = 'Successfully updated';
      })
      .catch(vm.glitch.handle);
    }
  }
})();
