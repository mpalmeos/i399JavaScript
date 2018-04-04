(function () {
    'use strict';

    angular.module('app').controller('NewCtrl', Ctrl);
    Ctrl.$inject = ['$http', '$routeParams', '$location'];

    function Ctrl($http, $location, $routeParams) {
        var vm = this;
        vm.contact = {};
        vm.addContact = addContact;

        var newContact = {
            name: vm.contact.name,
            phone: vm.contact.phone
        };

        function addContact() {
            $http.post('/api/contacts', newContact);
            back();
        }

        function back() {
            $location.path('/search');
        }
    }
})();