(function() {

    'use strict';

    angular.module('mean.recruits').factory('Recruits', RecruitsService);

    RecruitsService.$inject = [
        '$resource'
    ];

    /**
     * @ngdoc service
     * @name mean.recruits:Recruits
     * @module mean.recruits
     *
     * @description
     *
     * API Resource for recruits.
     */
    function RecruitsService(
        $resource
    ) {
        return $resource('/api/recruits/:recruitId', {recruitId: '@_id'}, {
            'update': { method:'PUT' }
        });
    }
})();