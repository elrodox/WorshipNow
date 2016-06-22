(function () {

var app = angular.module('worshipnow');
var firebaseHomeUrl = 'https://worshipnow.firebaseio.com/';

app.factory('songsService', function($firebaseArray){
  // var ref = new Firebase('https://shining-inferno-5737.firebaseio.com/');
  // var ref = new Firebase('https://shining-torch-1440.firebaseio.com/');

  var ref = new Firebase('https://worshipnow.firebaseio.com/songs');
  return $firebaseArray(ref);
});

app.factory('setListService', function($firebaseArray){
  	var ref = new Firebase('https://worshipnow.firebaseio.com/setList');
 //  	ref.orderByValue().on("position", function(snapshot) {
	// 	snapshot.forEach(function(data) {
	// 		console.log("The " + data.key() + " dinosaur's score is " + data.val());
	// 	});
	// });
  return $firebaseArray(ref);
});

app.factory("Auth", function($firebaseAuth) {
    var ref = new Firebase("https://worshipnow.firebaseio.com/users");
    return $firebaseAuth(ref);
});

app.factory("FireRef", function($firebaseAuth) {
    return new Firebase("https://worshipnow.firebaseio.com");
    // return $firebaseObject(ref);
});

})();
