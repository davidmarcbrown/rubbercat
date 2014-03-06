'use strict';

angular.module('rubbercatApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, Auth) {
      $scope.isLoggedIn = Auth.isLoggedIn();
      if ( $scope.isLoggedIn ){
        $http({method: 'GET', url: '/api/users/' + $rootScope.currentUser.id})
          .success( function ( data ){
            console.log( 'Success!\n' + JSON.stringify( data, null, 2 ));
            $scope.currentUser.profile = data.profile;
          });
      }
    });
