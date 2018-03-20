(function () {
    'use strict';

    angular.module('app').service('modalService', Srv);

    Srv.$inject = ['$q', '$document', '$http', '$compile', '$rootScope'];

    function Srv($q, $document, $http, $compile, $rootScope) {

        this.confirm = confirm;

        var modal;
        var scope;

        function confirm() {
            if (modal) {
                return showModal();
            }

            return $http.get('app/modal.html').then(function (result) {
                createModalElement(result.data);
                return showModal();
            });
        }

        function showModal() {
            var deferred = $q.defer();

            scope.ok = function () {
                modal.addClass('hide');
                deferred.resolve();
            };

            scope.cancel = function () {
                modal.addClass('hide');
                deferred.reject();
            };

            modal.removeClass('hide');

            return deferred.promise;
        }

        function createModalElement(html) {
            var body = angular.element($document[0].body);
            var containerElement = angular.element(html);
            scope = $rootScope.$new();
            modal = $compile(containerElement[0])(scope);
            body.append(modal);
        }
    }

})();