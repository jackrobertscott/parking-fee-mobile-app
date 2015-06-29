(function() {
  'use strict';

  angular
    .module('glitch')
    .factory('glitch', glitch);

  glitch.$inject = [];

  function glitch() {
    var good = '';
    var bad = '';
    var handle = defaultHandle;

    var service = {
      reset: reset,
      getError: getError,
      setError: setError,
      getSuccess: getSuccess,
      setSuccess: setSuccess,
      setHandle: setHandle,
      handle: handle
    };
    return service;

    function reset() {
      bad = '';
      good = '';
    }

    function getError() {
      return bad;
    }

    function setError(message) {
      bad = message;
    }

    function getSuccess() {
      return good;
    }

    function setSuccess(message) {
      good = message;
    }

    function setHandle(fn) {
      service.handle = fn;
    }

    function defaultHandle(err) {
      console.log(err);
      var message = err.message || err.data || '';
      setError(message);
    }
  }
})();