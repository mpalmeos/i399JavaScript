(function () {
    'use strict';

    angular.module('app').controller('EditCtrl', Ctrl);

    function Ctrl($http, $location, $routeParams) {
        var vm = this;
        vm.contact = {};
        vm.addContact = addContact;
        vm.back = back;

        getContact();

        function getContact(){
            $http.get('/api/contacts/' + $routeParams.id).then(function (result) {
                vm.contact = result.data;
            });
        }

        function addContact() {
            $http.put('/api/contacts/' + $routeParams.id, vm.contact);
            back();
        }

        function back() {
            $location.path('/search');
        }
    }
})();