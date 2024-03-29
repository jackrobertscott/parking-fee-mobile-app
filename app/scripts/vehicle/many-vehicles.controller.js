(function() {
  'use strict';

  angular
    .module('mobileApp')
    .controller('ManyVehiclesCtrl', ManyVehiclesCtrl);

  ManyVehiclesCtrl.$inject = ['dataVehicle', 'glitch', 'Auth', '$state'];

  function ManyVehiclesCtrl(dataVehicle, glitch, Auth, $state) {
    var vm = this;

    vm.vehicles = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getFewUser = getFewUser;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
      dataVehicle.getMany()
        .then(function(vehicles) {
          vm.vehicles = vehicles;
        })
        .catch(vm.glitch.handle);
    }

    function remove(vehicle) {
      dataVehicle.remove(vehicle)
        .then(function() {
          vm.vehicles.forEach(function(elem, i, array) {
            if (array[i]._id === vehicle._id) {
              array.splice(i, 1);
            }
          });
          vm.glitch.setSuccess('Successfully deleted vehicle');
        })
        .catch(vm.glitch.handle);
    }

    function getFewUser() {
      dataVehicle.getUserVehicles(Auth.getCurrentUser()._id)
        .then(function(vehicles) {
          vm.vehicles = vehicles;
        })
        .catch(vm.glitch.handle);
    }
  }
})();
