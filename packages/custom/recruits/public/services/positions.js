(function() {
    'use strict';

    angular.module('mean.recruits')
        .factory('Positions', Positions);


    /**
     *
     * @ngdoc factory
     * @module mean.recruits
     * @name mean.recruits:Positions
     *
     * @description
     *
     * A list of positions a player can lineup at.
     */
    function Positions() {
        return {
            'QB': 'Quarterback',
            'RB': 'Running Back',
            'FB': 'Full Back',
            'WR': 'Wide Receiver',
            'TE': 'Tight End',
            'OT': 'Offensive Lineman - Tackle',
            'OG': 'Offensive Lineman - Guard',
            'OC': 'Offensive Lineman - Center',
            'DE': 'Defensive End',
            'DT': 'Defensive Tackle',
            'OLB': 'Outside Linebacker',
            'MLB': 'Middle Linebacker',
            'CB': 'Cornerback',
            'FS': 'Free Safety',
            'SS': 'Strong Safety',
            'ATH': 'Athlete'
        };
    }
})();