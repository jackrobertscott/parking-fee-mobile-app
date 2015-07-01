(function() {
  'use strict';

  angular
    .module('mobileApp')
    .controller('OneSessionCtrl', OneSessionCtrl);

  OneSessionCtrl.$inject = ['dataSession', 'glitch', 'Auth', '$state', '$stateParams', 'dataVehicle', 'dataLocation', '$ionicPlatform', '$cordovaGeolocation', '$window'];

  function OneSessionCtrl(dataSession, glitch, Auth, $state, $stateParams, dataVehicle, dataLocation, $ionicPlatform, $cordovaGeolocation, $window) {
    var vm = this;

    vm.session = {};
    vm.map = {};
    vm.vehicles = [];
    vm.locations = [];
    vm.times = [];
    vm.glitch = glitch;
    vm.getOne = getOne;
    vm.getUserVehicles = getUserVehicles;
    vm.getLocations = getLocations;
    vm.startSession = startSession;
    vm.endSession = endSession;
    vm.markerClick = markerClick;

    ////////////

    activate();

    function activate() {
      vm.map = {
        center: {
          latitude: -31.9546529,
          longitude: 115.852662
        },
        zoom: 10
      };
      mapToLocation();
      for (var i = 1; i <= 24; i++) { // need to make sure not longer than limits
        vm.times.push({
          label: String(i * 30 + ' mins'),
          value: i * 30 * 60 * 1000 // Milliseconds (like from Date object)
        });
      }
      vm.session.time = vm.times[5].value;
    }

    ////////////

    function getOne(id) {
      id = id || $stateParams.id;
      dataSession.getOne(id)
        .then(function(session) {
          vm.session = session;
          vm.map.center = {
            latitude: session.latitude,
            longitude: session.longitude
          };
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
      if (!vm.session.vehicle || !vm.session.location || !vm.session.time) {
        vm.glitch.handle({
          message: 'Form missing fields'
        });
      } else {
        // should: form validation check
        var user = Auth.getCurrentUser();
        var session = {
          start: Date.now(),
          end: Date.now() + vm.session.time,
          payment: vm.session.location.rate * vm.session.time / (3600 * 1000),
          vehicle: vm.session.vehicle._id,
          location: vm.session.location._id,
          _creator: user._id
        };
        dataSession.create(session)
          .then(function(session) {
            $window.localStorage['currentSession'] = session._id;
            $state.go('app.sessionEnd', {
              id: session._id
            });
          })
          .catch(vm.glitch.handle);
      }
    }

    function endSession() {
      var user = Auth.getCurrentUser();
      var hours = (Date.now() - Date.parse(vm.session.start)) / (3600 * 1000);
      dataSession.update({
          _id: vm.session._id,
          end: Date.now(),
          payment: vm.session.location.rate * hours,
        })
        .then(function(session) {
          delete $window.localStorage['currentSession'];
          $state.go('app.sessionStart', {
            id: session._id
          });
        })
        .catch(vm.glitch.handle);
    }

    function mapToLocation() {
      $ionicPlatform.ready(function() {
        var options = {
          timeout: 10000, // Maximum time until it errors out
          enableHighAccuracy: false
        };
        $cordovaGeolocation.getCurrentPosition(options)
          .then(function(position) {
            vm.map.center = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
          }, function(err) {
            // error
          });
      });
    }

    function markerClick(marker, event, object) {
      // Not working atm.. need to add data-tap-disable="true" to map div
      vm.location = object;
    }
  }
})();
