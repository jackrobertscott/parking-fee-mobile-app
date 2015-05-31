(function() {
  'use strict';

  angular
  .module('mobileApp')
  .factory('SidemenuItem', SidemenuItem);

  SidemenuItem.$inject = ['$state'];

  function SidemenuItem($state) {
    return function(label, path, action) {
      this.label = label || 'LABEL_MISSING';
      if (path) {
        this.path = $state.href(path);
      } else {
        this.path = '';
      }
      this.action = action || angular.noop; // might not work without using '()'
    };
  }
})();
