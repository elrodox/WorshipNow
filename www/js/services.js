(function () {

var app = angular.module('worshipnow');


app.factory('songsService', function($firebaseArray){
  // var ref = new Firebase('https://shining-inferno-5737.firebaseio.com/');
  // var ref = new Firebase('https://shining-torch-1440.firebaseio.com/');

  var ref = new Firebase('https://worshipnow.firebaseio.com/songs');
  return $firebaseArray(ref);
});




})();
