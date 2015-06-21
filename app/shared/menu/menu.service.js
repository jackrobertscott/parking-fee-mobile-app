(function() {
  'use strict';

  angular
    .module('menu')
    .factory('menu', menu);

  menu.$inject = ['Auth', '$state'];

  function menu(Auth, $state) {
    var roles = Auth.getUserRoles();
    var items = [];

    var service = {
      reset: reset,
      addItem: addItem,
      getItems: getItems
    };

    return service;

    function reset() {
      items = [];
    }

    function addItem(object) {
      var item = safeItem(object);
      if (angular.isArray(object.children)) {
        object.children.forEach(function(child) {
          item.children.push(safeItem(child));
        });
      }
      items.push(item);
    }

    function safeItem(object) {
      var item = {
        label: object.label || 'MISSING_LABEL',
        direction: object.direction || '',
        minRole: setRole(object.minRole),
        maxRole: setRole(object.maxRole),
        data: object.data || {},
        children: []
      };
      return item;
    }

    function getItems() {
      // following variable must be on inside of function as can change...
      var userRole = Auth.getCurrentUser().role || roles[0];
      var filtered = items.slice(); // copy
      filtered = filter(userRole, filtered);
      filtered.forEach(function(item) {
        item.children = filter(userRole, item.children);
      });
      return filtered;
    }

    function filter(userRole, list) {
      if (!list || !list.length) {
        return [];
      }
      return list.filter(function(item) {
        return (!item.minRole || beforeOrEqual(item.minRole, userRole)) &&
          (!item.maxRole || beforeOrEqual(userRole, item.maxRole));
      });
    }

    function beforeOrEqual(before, after) {
      if (!before || !after) {
        console.log('MENU_BOE_ROLES_NOT_VALID');
        return false;
      } else {
        return roles.indexOf(before) <= roles.indexOf(after);
      }
    }

    function setRole(role) {
      if (role) {
        if (roles.indexOf(role) === -1) {
          console.log('MENU_SET_ROLE_NOT_VALID: ' + role);
        } else {
          return role;
        }
      }
      return '';
    }
  }
})();
