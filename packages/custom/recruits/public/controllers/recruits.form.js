'use strict';

/* jshint -W098 */
angular.module('mean.recruits').controller('RecruitsFormController', RecruitsFormController);

RecruitsFormController.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    'Global',
    'Recruits',
    'Positions',
    'ngToast'
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
    $state,
    $stateParams,
    Global,
    Recruits,
    Positions,
    ngToast
) {

    var ngToastOptions = {
        dismissButton: true,
        animation: 'fade',
        maxNumber: 1
    }

    $scope.id = $stateParams.id;
    $scope.isDateOpened = false;
    $scope.todaysDate = new Date();
    $scope.isEdit = angular.isDefined($scope.id);
    $scope.positions = Positions;
    $scope.saveRecruit = saveRecruit;
    $scope.openDateModal = openDateModal;

    init();

    /**
     * @ngdoc method
     * @name mean.recruits.RecruitsFormController
     * @module mean.recruits
     *
     * @description
     *
     * Load the current recruit if one exists.
     */
    function init()
    {
        if ($scope.isEdit) {
            Recruits.get({recruitId:$scope.id}, function(recruit){
                console.log('retrieve recruit');
                $scope.recruit = recruit;
            });
        }
    }

    /**
     * @ngdoc method
     * @name openDateModal
     * @methodOf mean.recruits.RecruitsFormController
     * @module mean.recruits
     *
     * @description
     *
     * Open the date modal.
     */
    function openDateModal($event)
    {
        $scope.isDateOpened = true;
    }


    /**
     * @ngdoc method
     * @name mean.recruits.RecruitsFormController
     * @module mean.recruits
     */
    function saveRecruit()
    {
        checkForm($scope.recruitForm);

        if(!$scope.recruitForm.$valid) {
            ngToast.danger('Please fix the errors below.', ngToastOptions);
            return;
        }

        if (angular.isDefined($scope.recruit) &&
            angular.isDefined($scope.recruit.heightFeet) &&
            angular.isDefined($scope.recruit.heightInches)) {
            $scope.recruit.height = parseInt($scope.recruit.heightFeet) * 12 + parseInt($scope.recruit.heightInches);
        }

        var successCallback = function(data, headers) {
            ngToast.create($scope.recruit.name + ' saved successfully.', ngToastOptions);
            $state.go('recruitsIndex');
        };

        var errorCallback = function(data, headers) {
            //error callback
            ngToast.danger('An unknown error occurred. Please contact the support team.', ngToastOptions);
        }

        if ($scope.isEdit) {
            Recruits.update($scope.recruit, successCallback, errorCallback);
        } else {
            Recruits.save($scope.recruit, successCallback, errorCallback);
        }
    }

    /**
     * @ngdoc method
     * @name checkForm
     * @methodOf mean.recruits:RecruitsFormController
     * @module mean.recruits
     *
     * @description
     *
     * Set the model as $dirty, so validation messages could show up.
     *
     * @todo move to validation service
     *
     * @param {ngModel} form - Form NgModel - $scope.someForm
     * @param [{Array}] fieldNames Pack of the field names to "review" values. ['firstName', 'lastName', 'password']
     */
    function checkForm(form, fieldNames) {
        var check = function (field) {
            var value;

            if (field && field.$pristine) {
                field.$setDirty();
                field.$setTouched();
                field.$commitViewValue();
            }
        };

        if (angular.isArray(fieldNames) && fieldNames.length) {
            fieldNames.forEach(function (name) {
                check(form[name]);
            });
        } else {
            for (var name in form) {
                if (name[0] !== '$') {
                    check(form[name]);
                }
            }
        }
    }
}