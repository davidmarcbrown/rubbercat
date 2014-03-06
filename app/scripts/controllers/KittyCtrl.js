'use strict';

angular.module('rubbercatApp')
  .controller('KittyCtrl', function ($rootScope, $scope, $routeParams, $location, KittyParse, KittyOps) {
    $scope.kittyId = $routeParams.id;
    $scope.kittyEditorData = {};
    $scope.currentUserName = $rootScope.currentUser ? $rootScope.currentUser.name : null;
    if ( $scope.kittyId ) {
      console.log( 'Looking up cat: ' + $scope.kittyId );
      $scope.kittyEditorData = KittyOps.get( { 'id' : $scope.kittyId },
        // success
        function( ) {
          console.log( 'Resource returned successful.' );
          //console.log( JSON.stringify( value, null, 2 ) );
          $scope.kittyEditorData.isAnon = ( $scope.kittyEditorData.createdBy === 'Anonymous' ) ? true : false;
          $scope.isMine = $scope.currentUserName === $scope.kittyEditorData.createdBy;
          $scope.lockCat = function (){
            KittyOps.update( { id : $scope.kittyId, isLocked : true },
              function ( value ) {
                console.log( 'This cat is now locked.' );
                $scope.kittyEditorData.isLocked = true;
                $scope.kittyEditorData.dateModified = value.dateModified;
              },
              function (response){
                console.log('Failure: ' + JSON.stringify( response, null, 2 ));
              }
            );
          };
          $scope.privacy = function ( isPrivate ){
            KittyOps.update( { 'id' : $scope.kittyId, 'isPrivate' : isPrivate },
              function ( value ) {
                console.log('This cat is now ' + ( isPrivate ? 'private.' : 'public.' ) );
                $scope.kittyEditorData.isPrivate = isPrivate;
                $scope.kittyEditorData.dateModified = value.dateModified;
              },
              function ( response ) {
                console.log('Failed: ' + JSON.stringify( response, null, 2 ) );
              }
            );
          };
        },
        // failure
        function( response ) {
          console.log( 'Resource returned failure.' );
          console.log( 'Response: ' + JSON.stringify(response) );
          console.log( JSON.stringify( $scope.kittyEditorData ) );
          $location.path( '/' );
        }
      );
    } else {
		  $scope.kittySubmit = function (){
        // returns all the data used in the annotation editor
			  $scope.kittyEditorData.lines = new KittyParse( $scope.kittyEditorData.unparsed );
        var newCat = {
          title : $scope.kittyEditorData.title || 'Untitled',
          lines : $scope.kittyEditorData.lines
        };
        //console.log( 'The new cat looks like: ' + JSON.stringify( newCat, null, 2 ) );
        KittyOps.save( newCat,
          // success
          function( value ){
            console.log( 'Successfully created: ' + JSON.stringify( value, null, 2 ) );
            $scope.kittyId = value.id;
            $location.path( '/kitty/' + $scope.kittyId );
          },
          // failure
          function( response ){
            console.log( 'Failure: ' + JSON.stringify( response, null, 2 ) );
          }
        );
		  };
    }
  });
