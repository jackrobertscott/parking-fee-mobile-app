(function() {
  'use strict';

  angular
  .module('mobileApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ionic',
    'config',
    'glitch',
    'dataServices',
    'auth',
    'menu'
  ])
  .config(config)
  .factory('authInterceptor', authInterceptor)
  //.factory('loadingInterceptor', loadingInterceptor)
  .run(allowAccess)
  .run(ionicSetup);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider'];

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/user/login');
    $httpProvider.interceptors.push('authInterceptor');
    //$httpProvider.interceptors.push('loadingInterceptor');
  }

  allowAccess.$inject = ['$rootScope', '$location', 'Auth', 'glitch'];

  function allowAccess($rootScope, $location, Auth, glitch) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      glitch.reset();
      Auth.isLoggedInAsync(function(loggedIn) {
        if (toState.data && toState.data.role && toState.data.role !== 'guest') {
          var userRoles = Auth.getUserRoles();
          if (!loggedIn) {
            $location.path('/app/user/login');
          } else if (userRoles.indexOf(toState.data.role) > userRoles.indexOf(Auth.getCurrentUser().role)) {
            // Logged in but not authorised
            $location.path('/app/session/start');
          }
        }
      });
    });
  }

  ionicSetup.$inject = ['$ionicPlatform', 'glitch', '$ionicPopup', '$rootScope', '$ionicLoading'];

  function ionicSetup($ionicPlatform, glitch, $ionicPopup, $rootScope, $ionicLoading) {
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
    // Set handle function for glitch
    glitch.setHandle(function(err) {
      console.log(err);
      var message = err.message || err.data || '';
      glitch.setError(message);
      $rootScope.$broadcast('glitch:error');
    });
    // Listen for error and displat popup
    $rootScope.$on('glitch:error', function() {
      $ionicPopup.alert({
        title: 'Error',
        template: glitch.getError()
      }).then(function() {
        glitch.reset();
      });
    });
    // Handle loading screen
    $rootScope.$on('loading:show', function() {
      console.log('loading:show');
      $ionicLoading.show({template: 'foo'});
    });
    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide();
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
          $location.path('/app/user/login');
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

  // // Loading screen show for slow server calls
  // loadingInterceptor.$inject = ['$rootScope'];
  //
  // function loadingInterceptor($rootScope) {
  //   return {
  //     request: function(config) {
  //       console.log('loading:show');
  //       $rootScope.$broadcast('loading:show');
  //       return config;
  //     },
  //     response: function(response) {
  //       console.log('loading:hide');
  //       $rootScope.$broadcast('loading:hide');
  //       return response;
  //     }
  //   };
  // }
})();
