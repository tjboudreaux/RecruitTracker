'use strict';

angular.module('mean.recruits').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('recruits example page', {
      url: '/recruits/example',
      templateUrl: 'recruits/views/index.html'
    });
  }
]);
