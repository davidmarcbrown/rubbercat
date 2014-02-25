'use strict';

angular.module('rubbercatApp')
  .controller('KittyTestCtrl', function ($scope, KittyParse) {

    // this is probably wrong. I'm sure there is a better way to alter
    // the view without this business being in the controller
    $scope.kittyUI = {
      textEntryVisibility : true,     // enter code here, visible by default
      parsedCodeVisibility : false    // hide the parsed code section until the form is submitted
    };

		$scope.kittySubmit = function (){
			$scope.kittyUI.textEntryVisibility = false;   // ugh, i feel so dirty
      $scope.kittyUI.parsedCodeVisibility = true;   // i KNOW this isn't the right way to do this

      // returns all the data used in the annotation editor
			$scope.kittyEditorData = KittyParse( $scope.data.kittyCode );
		}
  });
