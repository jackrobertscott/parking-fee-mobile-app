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
      for (var i = 30; i < 12*60; i+30) { // need to make sure not longer than limits
        vm.times.push({label: String(i + ' mins'), value: i});
      }
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
      })
      .catch(vm.glitch.handle);
    }

    function getLocations() {
      dataLocation.getMany()
      .then(function(locations) {
        vm.locations = locations;
      })
      .catch(vm.glitch.handle);
    }

    function startSession(form) {
      // should: form validation check
      var user = Auth.getCurrentUser();
      angular.extend(vm.session, {
        _creator: user._id,
        vehicle: vm.session.vehicle._id,
        start: Date.now,
        end: Date.now + vm.session.time.value
      });
      dataSession.create(vm.session)
      .then(function(session) {
        $state.go('app.sessionEnd', {
          id: session._id
        });
      })
      .catch(vm.glitch.handle);
    }

    function endSession(form) {
      var user = Auth.getCurrentUser();
      angular.extend(vm.session, {
        end: Date.now
      });
      dataSession.update(vm.session)
      .then(function(session) {
        $state.go('app.session');
      })
      .catch(vm.glitch.handle);
    }
  }
})();
