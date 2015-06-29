(function() {
  'use strict';

  angular
    .module('mobileApp')
    .controller('OneSessionCtrl', OneSessionCtrl);

  OneSessionCtrl.$inject = ['dataSession', 'glitch', 'Auth', '$state', '$stateParams', 'dataVehicle', 'dataLocation'];

  function OneSessionCtrl(dataSession, glitch, Auth, $state, $stateParams, dataVehicle, dataLocation) {
    var vm = this;

    vm.session = {};
    vm.vehicles = [];
    vm.locations = [];
    vm.times = [];
    vm.glitch = glitch;
    vm.getOne = getOne;
    vm.getUserVehicles = getUserVehicles;
    vm.getLocations = getLocations;
    vm.startSession = startSession;
    vm.endSession = endSession;

    ////////////

    activate();

    function activate() {
      for (var i = 1; i <= 24; i++) { // need to make sure not longer than limits
        vm.times.push({
          label: String(i*30 + ' mins'),
          value: i*30*60
        });
      }
      vm.session.time = vm.times[0];
    }

    ////////////

    function getOne(id) {
      id = id || $stateParams.id;
      dataSession.getOne(id)
        .then(function(session) {
          vm.session = session;
        })
        .catch(vm.glitch.handle);
    }

    function getUserVehicles() {
      dataVehicle.getUserVehicles(Auth.getCurrentUser()._id)
        .then(function(vehicles) {
          vm.vehicles = vehicles;
          vm.session.vehicle = vm.vehicles[0];
        })
        .catch(vm.glitch.handle);
    }

    function getLocations() {
      dataLocation.getMany()
        .then(function(locations) {
          vm.locations = locations;
          vm.session.location = vm.locations[0];
        })
        .catch(vm.glitch.handle);
    }

    function startSession() {
      // should: form validation check
      var user = Auth.getCurrentUser();
      var session = {
        start: Date.now(),
        time: vm.session.time.value,
        payment: vm.session.location.rate * vm.session.time.value / 3600,
        vehicle: vm.session.vehicle._id,
        _creator: user._id
      };
      dataSession.create(session)
        .then(function(session) {
          $state.go('app.sessionEnd', {
            id: session._id
          });
        })
        .catch(vm.glitch.handle);
    }

    function endSession() {
      var user = Auth.getCurrentUser();
      console.log();
      vm.session.time = Date.now() - new Date(vm.session.start).getTime();
      dataSession.update(vm.session)
        .then(function(session) {
          $state.go('app.sessionDetail', {
            id: session._id
          });
        })
        .catch(vm.glitch.handle);
    }
  }
})();
