(function() {
  'use strict';

  angular
  .module('tracto')
  .factory('tracto', tracto);

  tracto.$inject = [];

  function tracto() {
    var good = '';
    var bad = '';

    var service = {
      good: good,
      bad: bad,
      handle: handle,
      reset: reset
    };
    return service;

    function handle(err) {
      console.log(err);
      if (err && err.message) {
        bad = 'Error: ' + err.message;
      } else {
        bad = 'An error has occurred. We apologize for this inconvenience.';
      }
    }

    function reset() {
      bad = '';
      good = '';
    }
  }
})();
