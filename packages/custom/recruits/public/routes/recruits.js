'use strict';

angular.module('mean.recruits').config(['$stateProvider',
  function($stateProvider) {

    $stateProvider.state('recruitsIndex', {
      url: '/recruits',
      templateUrl: 'recruits/views/index.html',
      loggedin: function(MeanUser) {
            return MeanUser.checkLoggedOut();
      }
    });

    $stateProvider.state('recruitsCreate', {
      url: '/recruits/create',
      templateUrl: 'recruits/views/form.html',
      loggedin: function(MeanUser) {
            return MeanUser.checkLoggedOut();
      }
    });

    $stateProvider.state('recruitsEdit', {
      url: '/recruits/{:id}/edit',
      templateUrl: 'recruits/views/form.html',
      loggedin: function(MeanUser) {
            return MeanUser.checkLoggedOut();
      }
    });

  }
]);