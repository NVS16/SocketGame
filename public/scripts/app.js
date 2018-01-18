'use strict';

/**
 * @ngdoc overview
 * @name staticApp
 * @description
 * # staticApp
 *
 * Main module of the application.
 */

var socket = io();

angular
  .module('staticApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/draw', {
        templateUrl: 'views/draw.html',
        controller: 'DrawCtrl',
        controllerAs: 'draw'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
