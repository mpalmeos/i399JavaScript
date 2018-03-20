(function () {
    'use strict';

    angular.module('app').controller('EditCtrl', Ctrl);

    function Ctrl($http, $routeParams, $location) {
        var vm = this;
        vm.contact = {};
        vm.changeContact = changeContact;

        getContact();

        function getContact() {
            $http.get('api/contacts/' + $routeParams.id).then(function (result) {
                vm.contact = result.data;
            });
        }

        function changeContact() {
            var newContact = {
                name : vm.newContact,
                phone : vm.newPhone
            };

            $http.post('api/contacts', newContact);
            vm.newContact = '';
            vm.newPhone = '';
            back();
        }

        function back() {
            $location.path('/search');
        }
    }
})();