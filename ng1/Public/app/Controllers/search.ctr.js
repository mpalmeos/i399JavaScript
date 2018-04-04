(function () {
    'use strict';

    angular.module('app').controller('SearchCtrl', Ctrl);
    Ctrl.$inject = ['$http', '$routeParams', '$location', 'modalService'];

    function Ctrl($http, $routeParams, $location, modalService) {
        var vm = this;
        vm.contacts = {};

        vm.deleteContact = deleteContact;
        vm.deleteSelected = deleteSelected;

        refresh();

        function refresh() {
            $http.get('/api/contacts').then(function (result) {
                    vm.contacts = result.data;
                }).catch(function (err) {
                    console.error("Failed to get contacts", err);
                });
        }

        function deleteContact(id){
            modalService.confirm().then(function () {
                return $http.delete("/api/contacts" + id);
            }).then(refresh);
        }

        function deleteSelected() {
            return;
        }
    }
})();