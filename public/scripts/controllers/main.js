'use strict';

/**
 * @ngdoc function
 * @name staticApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the staticApp
 */
angular.module('staticApp')
  .controller('MainCtrl', function ($scope , $location) {

    $scope.rooms = [ "Winterfell", "Vale"];
    $scope.details = {
      name: "",
      roomname: $scope.rooms[0]
    };

    $scope.joinRoom = () => {
      console.log("submitted");
     // $location.path("draw")
      if( $scope.details.roomname && $scope.details.roomname != "none"){
        console.log($scope.details.roomname);
        socket.emit('joinroom', $scope.details );
      }
    }

    socket.on("entered" , function(){
      console.log("joined");
      $scope.$apply(function(){
        $location.path("draw");
      });
      console.log("here")
    })

    socket.on('room-full', function(room) {
      alert(room + " is full!");
    }); 

    socket.on("message" , function(msg){
      console.log(msg)
      alert(msg);
    })

    socket.on('room-vacant', function(room) {
      console.log(room + " is vacant!");
    });
    
  });
