'use strict';

angular.module('rubbercatApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
      $scope.isLoggedIn = Auth.isLoggedIn();
  });
