(function () {
    'use strict';

    angular.module('app').controller('SearchCtrl', Ctrl);

    function Ctrl($http, $routeParams, $location, modalService) {
        var vm = this;
        vm.contacts = {};
        vm.deleteContact = deleteContact;
        var asi = vm.OrderBy;
        vm.nameCodeFilter = nameCodeFilter;

        refresh();

        function refresh() {
            $http.get('api/contacts').then(function (result) {
               vm.contacts = result.data;
            });
        }

        function deleteContact(id){
            modalService.confirm().then(function () {
               return $http.delete('api/contacts/' + id)
            }).then(refresh);
        }

        function nameCodeFilter(asi) {

        }
    }
})();