(function() {
  'use strict';

  angular
    .module('mobileApp')
    .controller('OneVehicleCtrl', OneVehicleCtrl);

  OneVehicleCtrl.$inject = ['dataVehicle', 'glitch', 'Auth', '$state', '$stateParams'];

  function OneVehicleCtrl(dataVehicle, glitch, Auth, $state, $stateParams) {
    var vm = this;

    vm.vehicle = {};
    vm.glitch = glitch;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    function activate() {
      // replace these with real values
      vm.makes = ['Ford', 'Holden', 'Mazda', 'Suburu', 'Ferrari', 'Other'];
      vm.types = ['Sedan', 'Hatchback', 'Utility', 'Bus'];
      vm.colors = ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Black'];
      vm.vehicle.make = vm.makes[0];
      vm.vehicle.type = vm.types[0];
      vm.vehicle.color = vm.colors[0];
    }

    ////////////

    function getOne(id) {
      id = id || $stateParams.id;
      dataVehicle.getOne(id)
        .then(function(vehicle) {
          vm.vehicle = vehicle;
        })
        .catch(vm.glitch.handle);
    }

    function create(form) {
      // should: form validation check
      var user = Auth.getCurrentUser();
      angular.extend(vm.vehicle, {
        _creator: user._id,
        users: [user._id]
      });
      dataVehicle.create(vm.vehicle)
        .then(function(vehicle) {
          $state.go('app.vehicleUser');
        })
        .catch(vm.glitch.handle);
    }

    function update(form) {
      dataVehicle.update(vm.vehicle)
        .then(function(vehicle) {
          $state.go('app.vehicleUser');
        })
        .catch(vm.glitch.handle);
    }

    function remove(form) {
      dataVehicle.remove(vm.vehicle)
        .then(function() {
          $state.go('app.vehicleUser');
        })
        .catch(vm.glitch.handle);
    }
  }
})();