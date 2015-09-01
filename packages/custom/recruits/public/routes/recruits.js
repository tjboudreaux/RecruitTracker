(function() {

    'use strict';

    angular.module('mean.recruits').config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('recruitsIndex', {
            controller: 'RecruitsController',
            url: '/recruits',
            templateUrl: 'recruits/views/index.html',
            resolve: {
                loggedin: function(MeanUser) {
                      return MeanUser.checkLoggedin();
                }
            }
        });

        $stateProvider.state('recruitsCreate', {
            controller: 'RecruitsFormController',
            url: '/recruits/create',
            templateUrl: 'recruits/views/form.html',
            resolve: {
                loggedin: function(MeanUser) {
                    return MeanUser.checkLoggedin();
                }
            }
        });

        $stateProvider.state('recruitsEdit', {
            controller: 'RecruitsFormController',
            url: '/recruits/{:id}/edit',
            templateUrl: 'recruits/views/form.html',
            resolve: {
                loggedin: function(MeanUser) {
                    return MeanUser.checkLoggedin();
                }
            }
        });
      }
    ]);
})();