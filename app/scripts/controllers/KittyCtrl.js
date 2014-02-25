'use strict';

angular.module('rubbercatApp')
  .controller('KittyCtrl', function ($scope, $routeParams) {
    console.log( JSON.stringify( $routeParams ) );

    // this is probably wrong. I'm sure there is a better way to alter
    // the view without this business being in the controller
    $scope.kittyUI = {
      textEntryVisibility : false,     // enter code here, visible by default
      parsedCodeVisibility : true    // hide the parsed code section until the form is submitted
    };

		$scope.kittyEditorData = $scope.currentUser ? $scope.currentUser.cats[0] : {};
  });
