'use strict';

angular.module('myApp.manageContact', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-contact', {
            templateUrl: 'manageContact/manageContact.html',
            controller: 'ManageContactCtrl'
        });
        $routeProvider.when('/edit-contact/:contactId', {
            templateUrl: 'manageContact/manageContact.html',
            controller: 'ManageContactCtrl'
        });
    }])

    .controller('ManageContactCtrl', [
        '$scope', '$routeParams', '$location', 'ContactsDataService', 'localStorageService',
        function ($scope, $routeParams, $location, contactsDataService, localStorageService) {
            $scope.contact = {
                additionalEmails: [],
                additionalPhones: []
            };
            $scope.contacts = contactsDataService.getContacts();

            $scope.addAdditionalEmail = function() {
                if (!$scope.contact.additionalEmails.length) {
                    $scope.contact.additionalEmails = [''];
                } else {
                    $scope.contact.additionalEmails.push('');
                }
            };

            $scope.deleteAdditionalEmail = function(index){
                $scope.contact.additionalEmails.splice(index,1);
                localStorageService.set('contacts', $scope.contacts);
            };

            $scope.addAdditionalPhone = function () {
                if (!$scope.contact.additionalPhones.length) {
                    $scope.contact.additionalPhones = [''];
                } else {
                    $scope.contact.additionalPhones.push('');
                }
            };
            $scope.deleteAdditionalPhone = function(index){
                $scope.contact.additionalPhones.splice(index,1);
                localStorageService.set('contacts', $scope.contacts);
            };
            var contactId = $routeParams.contactId ? parseInt($routeParams.contactId, 10) : false;

            if (contactId === parseInt(contactId, 10)) {
                $scope.editStatus = true;
                $scope.contact = contactsDataService.getContact(contactId, true);

                $scope.editContact = function () {
                    contactsDataService.editContact($scope.contact);
                    $scope.contact = contactsDataService.resetContact();
                    $location.path('/contacts');
                };
                $scope.deleteContact = function () {
                    contactsDataService.deleteContact($scope.contact);
                    $scope.contact = contactsDataService.resetContact();
                    // $location.path('/contacts');
                };
            } else {

                $scope.insertContact = function () {
                    console.log($scope.contact);
                    contactsDataService.addContact($scope.contact);
                    $scope.contact = contactsDataService.resetContact();
                    $location.path('/contacts');
                };
            }


        }]);