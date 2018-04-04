(function () {
    'use strict';

    angular.module('app').controller('EditCtrl', Ctrl);
    Ctrl.$inject = ['$http', '$routeParams', '$location'];

    function Ctrl($http, $location, $routeParams) {
        var vm = this;
        vm.contact = {};
        vm.addContact = addContact;

        getContact();

        function getContact(){
            $http.get('/api/contacts' + $routeParams.id).then(function (result) {
                vm.contact = result;
            });
        }

        function addContact() {
            $http.post('/api/contacts' + $routeParams.id).then(function (result) {
                vm.contact = result.data;
            });
            back();
        }

        function back() {
            $location.path('/search');
        }
    }
})();