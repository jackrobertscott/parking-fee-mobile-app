(function() {
    'use strict';

    angular
        .module('mobileApp')
        .controller('ManyVehiclesCtrl', ManyVehiclesCtrl);

    ManyVehiclesCtrl.$inject = ['dataVehicle'];

    function ManyVehiclesCtrl(dataVehicle) {
        var vm = this;

        activate();

        function activate() {
          // code...
        }
    }
})();
