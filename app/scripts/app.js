(function() {
  'use strict';

  angular
  .module('mobileApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ionic',
    'config',
    'auth',
    'dataServices'
  ])
  .config(config)
  .factory('authInterceptor', authInterceptor)
  .run(ionic)
  .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');

    $httpProvider.interceptors.push('authInterceptor');
  }

  ionic.$inject = ['$ionicPlatform'];

  function ionic($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }

  authInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$location'];

  function authInterceptor($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/app/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

  run.$inject = ['$rootScope', '$location', 'Auth', 'tracto'];

  function run($rootScope, $location, Auth, tracto) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      tracto.reset();
      Auth.isLoggedInAsync(function(loggedIn) {
        if (toState.data && toState.data.role && toState.data.role !== 'guest') {
          var userRoles = Auth.getUserRoles();
          if (!loggedIn) {
            $location.path('/app/login');
          } else if (userRoles.indexOf(toState.data.role) > userRoles.indexOf(Auth.getCurrentUser().role)) {
            // Logged in but not authorised
            $location.path('/app/example');
          }
        }
      });
    });
  }
})();
