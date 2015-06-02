(function() {
  'use strict';

  angular
  .module('glitch')
  .factory('glitch', glitch);

  glitch.$inject = [];

  function glitch() {
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
