'use strict';

angular.module('rubbercatApp')
  .factory('KittyOps', function ($resource) {
    return $resource('/api/cats/:id',
      { id : '@id' },
      {
        update: {
          method: 'PUT',
          params: {}
        },
        get: {
          method: 'GET',
          params: {}
        }
	    }
    );
  });
