'use strict';

/* jshint -W098 */
angular.module('mean.recruits').controller('RecruitsController', RecruitsController);

RecruitsController.$inject = [
    '$scope',
    'Global',
    'Recruits'
];

/**
 * @ngdoc controller
 * @name mean.recruits:RecruitsController
 * @module mean.recruits
 *
 * @description
 *
 * Index controller of the Recruits package --- it lists out all of the recruits
 * the team is currently tracking.
 *
 */
function RecruitsController(
    $scope,
    Global,
    Recruits
) {
    /**
     * This is required by the mean.io architecture :(
     * Do not remove package declaration.
     */
    $scope.global = Global;
    $scope.package = {
        name: 'Recruits'
    };

    $scope.showEmptyState = true;


}


/* jshint -W098 */
angular.module('mean.recruits').controller('RecruitsFormController', RecruitsFormController);

RecruitsFormController.$inject = [
    '$scope',
    'Global',
    'Recruits',
    'Positions'
];

/**
 * @ngdoc controller
 * @name mean.recruits:RecruitsFormController
 * @module mean.recruits
 *
 * @description
 *
 * Index controller of the Recruits package --- it lists out all of the recruits
 * the team is currently tracking.
 *
 */
function RecruitsFormController(
    $scope,
    Global,
    Recruits
) {
    $scope.showEmptyState = true;

}