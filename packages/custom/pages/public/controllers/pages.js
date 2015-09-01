'use strict';

/* jshint -W098 */
angular.module('mean.pages').controller('PagesController', ['$scope', 'Global', 'Pages',
  function($scope, Global, Pages) {
    $scope.global = Global;
    $scope.package = {
      name: 'pages'
    };
  }
]);
