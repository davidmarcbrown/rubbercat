'use strict';

angular.module('rubbercatApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
