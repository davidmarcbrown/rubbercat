'use strict';

angular.module('rubbercatApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http, Auth, KittyOps, $location) {
      $scope.isLoggedIn = Auth.isLoggedIn();
      if ( $scope.isLoggedIn ){
        $http({method: 'GET', url: '/api/users/' + $rootScope.currentUser.id})
          .success( function ( data ){
            console.log( 'Success!\n' + JSON.stringify( data, null, 2 ));
            $scope.currentUser.profile = data.profile;

            $scope.deleteCat = function ( catId, index ){
              KittyOps.update( { 'id' : catId, 'delete' : true },
                function (value ){
                  console.log('Success: ' + JSON.stringify(value, null, 2) );
                  $scope.currentUser.profile.cats.splice( index, 1 );
                },
                function (err){
                  console.log('Failure: ' + JSON.stringify(err, null, 2) );
                }
              );
            };
          });
      }
    });
