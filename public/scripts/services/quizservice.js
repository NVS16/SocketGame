'use strict';

angular.module('staticApp')
.service('quizservice',function(){   /* AngularJS service to check who is drawing */
    this.words = [
        "cat",
        "pineapple",
        "pen"
    ];
    this.options = [
        [ "cat", "dog", "goat", "sheep" ],
        [ "hedgehog", "pineapple", "tree", "carrots" ],
        [ "pencil", "pen", "stick", "chalk" ]
    ];
});