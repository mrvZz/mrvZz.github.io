'use strict';

angular.module('myApp', [
    'ngRoute',
    'LocalStorageModule',
    'myApp.services.contactsData',
    'myApp.contacts',
    'myApp.manageContact',
    'myApp.version',
    'ui.bootstrap.tpls'
]).
    config(['$routeProvider', 'localStorageServiceProvider', function ($routeProvider, localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ls');
        $routeProvider.otherwise({redirectTo: '/contacts'});
    }]);

