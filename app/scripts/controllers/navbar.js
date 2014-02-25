'use strict';

angular.module('rubbercatApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.menu = ( Auth.isLoggedIn() ) ? [{
      'title': 'Settings',
      'link': '/settings'
    }] : null;
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/main');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
