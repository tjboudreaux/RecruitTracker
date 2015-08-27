'use strict';

/* jshint -W098 */
angular.module('mean.recruits').controller('RecruitsController', ['$scope', 'Global', 'Recruits',
  function($scope, Global, Recruits) {
    $scope.global = Global;
    $scope.package = {
      name: 'recruits'
    };
  }
]);
