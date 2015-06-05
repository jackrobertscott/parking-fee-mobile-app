(function() {
  'use strict';

  angular
  .module('mobileApp')
  .controller('ManySessionsCtrl', ManySessionsCtrl);

  ManySessionsCtrl.$inject = ['dataSession', 'glitch', 'Auth', '$state'];

  function ManySessionsCtrl(dataSession, glitch, Auth, $state) {
    var vm = this;

    vm.sessions = [];
    vm.glitch = glitch;
    vm.getFewUser = getFewUser;
    vm.toDetails = toDetails;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getFewUser() {
      dataSession.getUserSessions(Auth.getCurrentUser()._id)
      .then(function(sessions) {
        vm.sessions = sessions;
      })
      .catch(vm.glitch.handle);
    }

    function toDetails(session) {
      $state.go('app.sessionDetails', {
        id: session._id
      });
    }
  }
})();
