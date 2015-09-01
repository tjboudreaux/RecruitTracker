(function() {

    'use strict';

    /* jshint -W098 */
    angular.module('mean.recruits').controller('RecruitsController', RecruitsController);

    RecruitsController.$inject = [
        '$scope',
        '$state',
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
        $state,
        Global,
        Recruits
    ) {
        /**
         * This is required by the mean.io architecture :(
         * Do not remove package declaration.
         */
        $scope.global = Global;
        $scope.package = {
            name: 'recruits'
        };

        //define scope params and methods here
        $scope.recruits = [];
        $scope.displayHeight = displayHeight;
        $scope.editRecruit = editRecruit;
        $scope.calculateAge = calculateAge;

        init();

        /////////////////////////////////////////////////////////////////////
        // implement private and scope methods below
        /////////////////////////////////////////////////////////////////////

        /**
         * @ngdoc method
         * @name  init
         * @methodOf mean.recruits:RecruitsController
         * @module mean.recruits
         *
         * @description
         *
         * Run init function.
         */
        function init()
        {
            Recruits.query(function(recruits){
                $scope.recruits = recruits;
                $scope.showEmptyState = $scope.recruits.length == 0;
            });
        }

        /**
         * @ngdoc method
         * @name  displayHeight
         * @methodOf mean.recruits:RecruitsController
         * @module mean.recruits
         *
         * @description
         *
         * Convert height in inches to a display friendly format.
         *
         * @todo Travis, you know better. Move this into a service model.
         */
        function displayHeight(heightInInches)
        {

            var feet = Math.floor(heightInInches / 12);
            var inches = Math.floor(heightInInches - (feet * 12));

            return feet + ' ft. ' + inches + ' in.';
        }

        /**
         * @ngdoc method
         * @name  editRecruit
         * @methodOf mean.recruits:RecruitsController
         * @module mean.recruits
         *
         * @description
         *
         * Go to the edit recruit page.
         *
         */
        function editRecruit(recruitId)
        {
            $state.go('recruitsEdit', {id: recruitId});
        }

        /**
         * @ngdoc method
         * @name  calculateAge
         * @methodOf mean.recruits:RecruitsController
         * @module mean.recruits
         *
         * @description
         *
         * Convert a player's birthdate into current age.
         *
         */
        function calculateAge(birthdate)
        {

            if (!angular.isDefined(birthdate)) {
                return '';
            }

            var ageDifMs = Date.now() - new Date(birthdate).getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    }
})();