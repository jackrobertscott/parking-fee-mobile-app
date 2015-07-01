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
      vm.makes = ['Acura', 'Alfa Romeo', 'Aston Martin', 'Audi', 'Bentley', 'BMW', 'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroen', 'Dodge', 'Ferrari', 'Fiat', 'Ford', 'Geely', 'General Motors', 'GMC', 'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Koenigsegg', 'Lamborghini', 'Land Rover', 'Lexus', 'Maserati', 'Mazda', 'McLaren', 'Mercedes', 'Mini', 'Mitsubishi', 'Nissan', 'Pagani', 'Peugeot', 'Porsche', 'Ram', 'Renault', 'Rolls Royce', 'Saab', 'Subaru', 'Suzuki', 'Tata Motors', 'Tesla Motors', 'Toyota', 'Volkswagen', 'Volvo', 'Other'];
      vm.types = ['Aerosani', 'Airship', 'All-terrain vehicle', 'Amphibious all-terrain vehicle', 'Amphibious vehicle', 'Autobus', 'Autogyro', 'Automobile', 'Auto rickshaw', 'Balloon', 'Bathyscaphe', 'Bicycle', 'Blimp', 'Boat', 'Bus', 'Cable car', 'Canoe', 'Coach (bus)', 'Coach (carriage)', 'Cycle rickshaw', 'Dandy horse', 'Deep Submergence Vehicle', 'Diving bell', 'Diving chamber', 'Dog sled', 'Draisine', 'Electric vehicle', 'Fixed-wing aircraft', 'Golf cart', 'Ground effect vehicle', 'Glider aircraft', 'Handcar', 'Hang glider', 'Hopper', 'Helicopter', 'Hovercraft', 'Hydrofoil', 'Ice Skates', 'Jet aircraft', 'Jet pack', 'Kayak', 'Kick scooter', 'Land yacht', 'Launch escape capsule', 'Locomotive', 'Maglev', 'Minibus', 'Minivan', 'Monorail', 'Monowheel', 'Moped', 'Motorcycle', 'Omni Directional Vehicle', 'Ornithopter', 'Passenger car', 'Rickshaw', 'Pedalo', 'Pogo Stick', 'Powered parachute', 'Quadracycle', 'Road train', 'Rocket', 'Rocket sled', 'Rover', 'Sailboat', 'Scooter (motorcycle)', 'Screw-propelled vehicle', 'Sea tractor', 'Segway Personal Transporter', 'Ship', 'Single-track vehicle', 'Skateboard', 'Skis', 'Sled', 'Snowboard', 'Snowmobile', 'Space Hopper', 'Steam car', 'Submarine', 'Submersible', 'Surfboard', 'Tank', 'Tractor', 'Traction engine', 'Train', 'Tram', 'Tricycle', 'Trolleybus', 'Truck', 'Unicycle', 'Unmanned aerial vehicle', 'Van', 'Velocipede', 'Velomobile', 'Wagon', 'Wheelbarrow', 'Wingpack', 'Yacht', 'Zipline', 'Other'];
      vm.colors = ['Black', 'Blue', 'Brown', 'Grey', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'White', 'Yellow'];
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
