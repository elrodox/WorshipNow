(function () {

var app = angular.module('worshipnow');

app.factory('Song', function($firebaseArray){
  // var ref = new Firebase('https://shining-inferno-5737.firebaseio.com/');
  var ref = new Firebase('https://worshipnow.firebaseio.com/');
  return $firebaseArray(ref);
});




})();
