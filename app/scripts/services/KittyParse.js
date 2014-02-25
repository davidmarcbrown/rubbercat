'use strict';

angular.module('rubbercatApp')
  .factory('KittyParse', function ( $sanitize ) {
		return function ( parseMe ){
      var editorData = {}
      
      parseMe = parseMe.replace(/\t/g, '    ');
      parseMe = parseMe.split('\n');

      editorData.lines = [];

      for ( var i = 0; i < parseMe.length; i++ ) {
        editorData.lines.push( { 'code' : parseMe[i],
                                 'annotation' : "" });
      }
			return editorData;

		};
  });
