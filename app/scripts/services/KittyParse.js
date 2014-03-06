'use strict';

angular.module('rubbercatApp')
  .factory('KittyParse', function () {
		return function ( parseMe ){
      parseMe = parseMe.replace(/\t/g, '    ');
      parseMe = parseMe.split('\n');

      var lines = [];

      for ( var i = 0; i < parseMe.length; i++ ) {
        lines.push( { 'code' : parseMe[i], 'annotation' : '' });
      }
			return lines;

		};
  });
