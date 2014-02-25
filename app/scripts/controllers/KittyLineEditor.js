'use strict';

angular.module('rubbercatApp')
  .controller('KittyLineEditor', function ($scope) {
      $scope.isActive = false;
      $scope.annotation = $scope.line.annotation;
      $scope.isEditing = !$scope.line.annotation;

      $scope.editLine = function () {
        $scope.isActive = !$scope.isActive;
      }

      $scope.startEditing = function () {
        $scope.isEditing = true;
      }

      $scope.doneEditing = function () {
        $scope.line.annotation = $scope.annotation;
        if ( $scope.annotation ){
          $scope.isEditing = !$scope.line.annotation;
        } else {
          $scope.isActive = false;
        }
      }
  });
