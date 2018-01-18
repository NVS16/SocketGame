'use strict';

angular.module('staticApp')
.service('drawservice',function(){   /* AngularJS service to check who is drawing */
    var drawing = false ; 

    return{
        getValue : function(){
            return drawing ;
        },
        changeValue : function(){
            drawing : !drawing
        }
    }
});