(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('TemplateCtrl', TemplateCtrl);

  TemplateCtrl.$inject = ['$scope'];

  function TemplateCtrl($scope) {
    var vm = this;
    
    activate();

    function activate() {
      // code...
    }
  }
})();
