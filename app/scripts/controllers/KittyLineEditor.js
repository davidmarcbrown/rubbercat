'use strict';

angular.module('rubbercatApp')
  .controller('KittyLineEditor', function ($scope, KittyOps) {
    if ( $scope.kittyId ){
      $scope.isActive = false;
      $scope.annotation = $scope.line.annotation;
      $scope.isEditing = !$scope.line.annotation;

      $scope.editLine = function () {
        if ( ( $scope.isEditing && ( !$scope.kittyEditorData.isLocked || $scope.currentUserName === $scope.kittyEditorData.createdBy ) ) || !$scope.isEditing ) {
          $scope.isActive = !$scope.isActive;
        }
      };

      $scope.startEditing = function () {
        $scope.isEditing = true;
      };

      $scope.doneEditing = function () {
        $scope.line.annotation = $scope.annotation;
        if ( $scope.annotation ){
          $scope.isEditing = !$scope.line.annotation;
        } else {
          $scope.isActive = false;
        }
        console.log('Altered line ' + $scope.$index + ' ' + JSON.stringify( $scope.line, null, 2 ) );
        console.log('Trying to update ' + $scope.kittyId );
        KittyOps.update(
          {
            id : $scope.kittyId,
            updateAnnotation : { index : $scope.$index, annotation : $scope.line.annotation }
          },
          // success
          function ( value ) {
            console.log('Successfully updated.');
            $scope.kittyEditorData.dateModified = value.dateModified;
            $scope.theForm.$setPristine();
          },
          // failure
          function () {
            console.log('Couldn\'t update.');
          }
        );
      };
    }
  });
