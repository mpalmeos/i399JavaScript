(function () {
    'use strict';

    angular.module('app').controller('NewCtrl', Ctrl);

    function Ctrl($http, $routeParams, $location) {
        var vm = this;
        vm.newContact = '';
        vm.newPhone = '';
        vm.addContact = addContact;
        vm.back = back;

        function addContact() {
            var newContact = {
                name : vm.contact.name,
                phone : vm.contact.phone
            };

            $http.post('api/contacts', newContact);
            back();
        }

        function back() {
            $location.path('/search');
        }
    }
})();