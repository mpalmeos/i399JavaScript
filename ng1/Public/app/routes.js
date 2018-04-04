(function () {
    'use strict';
    angular.module('app', ['ngRoute']);

    angular.module('app').config(RouteConfig);
    RouteConfig.$inject = ['$routeProvider'];

    function RouteConfig($routeProvider) {

        $routeProvider.when('/search', {
            templateUrl : 'app/Views/search.html',
            controller : 'SearchCtrl',
            controllerAs : 'vm'
        }).when('/new', {
            templateUrl : 'app/Views/new.html',
            controller : 'NewCtrl',
            controllerAs : 'vm'
        }).when('/edit/:id', {
            templateUrl : 'app/Views/new.html',
            controller : 'EditCtrl',
            controllerAs : 'vm'
        }).otherwise('/search');
    }
})();