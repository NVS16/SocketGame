'use strict';

/**
 * @ngdoc function
 * @name staticApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the staticApp
 */
angular.module('staticApp')
  .controller('DrawCtrl', function ($scope , drawservice, quizservice) {

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var width = window.innerWidth;
    var height = window.innerHeight;

    canvas.width = width / 1.5;
    canvas.height = height / 2;

    var radius = 5
    context.lineWidth = radius * 2;
    var isDrawing = false;


    var putPoint = function(e) {
        
        if(isDrawing) {
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            context.beginPath();
            context.arc(e.offsetX, e.offsetY, radius, 0, 2 * Math.PI);
            context.fill();
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
        }

    };

    var engage = function(e) {
        isDrawing = true;
        putPoint(e);
    };

    var disengage = function(e) {
        isDrawing = false;
        context.beginPath();
    }

    // Drawing in room logic
    $scope.drawing = false ;
    $scope.drawbtn = true ;
    $scope.showquiz = function() {

    };

    $scope.drawnow = function (){ 
        $scope.drawbtn = false ;
        $scope.drawing = !$scope.drawing ;
        console.log($scope.drawing);
        socket.emit("draw-first", "I'm drawing first");
    }

    socket.on('engage', function(e) {
        e.offsetX = e.offsetX * canvas.width;
        e.offsetY = e.offsetY * canvas.height;
        console.log("X: " + e.offsetX + " Y: " + e.offsetY);
        engage(e);
    });

    socket.on('draw', function(e) {
        e.offsetX = e.offsetX * canvas.width;
        e.offsetY = e.offsetY * canvas.height;
        putPoint(e);
    });

    socket.on('disengage', function(e) {
        disengage(e);
    });

    socket.on("see-drawing" , function(msg){
        console.log(msg);
        $scope.$apply(function(){
            $scope.drawbtn = false ;
        });
    });

    canvas.addEventListener('mousedown', function(e) {
        socket.emit('engage', {offsetX: e.offsetX / canvas.width, offsetY: e.offsetY / canvas.height});
        engage(e);
    });
    canvas.addEventListener('mousemove', function(e) {
        socket.emit('draw', {offsetX: e.offsetX / canvas.width, offsetY: e.offsetY / canvas.height});
        putPoint(e);
    });
    canvas.addEventListener('mouseup', function(e) {
        socket.emit('disengage');
        disengage(e);
    });
    canvas.addEventListener('mouseleave', function(e) {
        socket.emit('disengage');
        disengage(e);
    });

    
});