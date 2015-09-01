'use strict';

angular.module('mean.pages').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('pageAboutUs', {
      url: '/about-us',
      templateUrl: 'pages/views/about-us.html'
    });
  }
]);


angular.module('mean.pages').config(['$viewPathProvider',
    function($viewPathProvider) {
        $viewPathProvider.override('system/views/index.html', 'pages/views/index.html');
        $viewPathProvider.override('system/views/header.html', 'pages/views/header.html');
        $viewPathProvider.override('user/views/login.html', 'pages/views/login.html');
        $viewPathProvider.override('admin/views/index.html', 'pages/views/admin-menu.html');
    }
]);
