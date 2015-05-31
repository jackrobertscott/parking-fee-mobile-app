(function() {
  'use strict';

  angular
  .module('auth', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'config',
    'tracto',
    'dataServices'
  ]);
})();
