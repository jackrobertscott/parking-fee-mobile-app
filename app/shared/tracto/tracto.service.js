(function() {
  'use strict';

  angular
  .module('tracto')
  .factory('tracto', tracto);

  tracto.$inject = [];

  function tracto() {
    var service = {
      bad: '',
      good: '',
      handle: handle,
      reset: reset
    };

    return service;

    function handle(err) {
      console.log(err);
      if (err.message) {
        service.bad = 'Error: '+err.message;
      } else {
        service.bad = 'An error has occurred. We apologize for this inconvenience.';
      }
    }

    function reset() {
      service.bad = '';
      service.good = '';
    }
  }
})();
