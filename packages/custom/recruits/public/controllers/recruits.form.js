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

    //define scope params and methods here
    $scope.id = $stateParams.id;
    $scope.isDateOpened = false;
    $scope.maxDate = new Date();
    $scope.isEdit = angular.isDefined($scope.id);
    $scope.positions = Positions;
    $scope.saveRecruit = saveRecruit;
    $scope.openDateModal = openDateModal;
    $scope.validateName = validateName;
    $scope.updateHeight = updateHeight;
    $scope.graduationClasses = [];
    init();

    /////////////////////////////////////////////////////////////////////
    // implement private and scope methods below
    /////////////////////////////////////////////////////////////////////

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
                if (angular.isDefined(recruit.birthDate)) {
                    //fixes a type bug caused by loading a date string into the widget
                    recruit.birthDate = new Date(recruit.birthDate);
                }
                $scope.recruit = recruit;
            });
        }

        var thisYear = new Date().getFullYear();

        for (var i=0; i<=17; i++) {
            $scope.graduationClasses.push(thisYear + i);
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

    /**
     * @ngdoc method
     * @name validateName
     * @methodOf mean.recruits:RecruitsFormController
     * @module mean.recruits
     *
     * @description
     *
     * A name can only contain letters, apostrophes and spaces.
     *
     * @param {String} name string to validate
     *
     */
    function validateName(name)
    {
        if (!angular.isString(name))
        {
            //only validate strings --- other rules like required can handle null cases
            return true;
        }

        var matches = name.match(/^[a-zA-Z\s']+$/);

        return (angular.isArray(matches) && matches.length > 0);
    }

    /**
     * @ngdoc method
     * @name updateHeight
     * @methodOf mean.recruits:RecruitsFormController
     * @module mean.recruits
     *
     * @description
     *
     * Combine the feet and inches into one height value. This is triggered via an ng-change
     * event on the feet and inches fields.
     *
     */
    function updateHeight()
    {
        var feetInInches = angular.isDefined($scope.recruit.heightFeet) ? parseInt($scope.recruit.heightFeet) * 12 : 0;
        var inches = angular.isDefined($scope.recruit.heightInches) ? parseInt($scope.recruit.heightInches) : 0;

        $scope.recruit.height = feetInInches + inches;
        console.log($scope.recruit.height);
    }
}