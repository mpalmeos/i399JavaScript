(function () {
    'use strict';
    angular.module('app', ['ngRoute']);

    angular.module('app').config(RouteConfig);

    function RouteConfig($routeProvider) {

        $routeProvider.when('/search', {
            templateUrl : 'app/search.html',
            controller : 'SearchCtrl',
            controllerAs : 'vm'
        }).when('/new', {
            templateUrl : 'app/new.html',
            controller : 'NewCtrl',
            controllerAs : 'vm'
        }).when('/edit/:id', {
            templateUrl : 'app/new.html',
            controller : 'EditCtrl',
            controllerAs : 'vm'
        }).otherwise('/search');
    }
})();