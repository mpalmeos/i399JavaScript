(function () {
    'use strict';

    angular.module('app').controller('EditCtrl', Ctrl);

    function Ctrl($http, $routeParams, $location) {
        var vm = this;
        vm.addContact = addContact;
        vm.back = back;
        vm.contact = {};

        getContact();

        function getContact() {
            $http.get('api/contacts/' + $routeParams.id).then(function (result) {
                vm.contact = result.data;
            });
        }

        function addContact() {
            $http.put('api/contacts/' + $routeParams.id, vm.contact);
            back();
        }

        function back() {
            $location.path('/search');
        }
    }
})();