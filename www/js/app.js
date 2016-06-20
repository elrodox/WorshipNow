//main wrap da se ne poluta global namespace
(function(){

var app = angular.module('queup', ['ionic','angularMoment','firebase']);

app.config(function($stateProvider,$urlRouterProvider){

  $stateProvider.state('queue',{
    url:'/queue',
    templateUrl:'templates/queue.html'
  });

  $stateProvider.state('edit',{
    url:'/edit/:songId',
    controller:'EditController',
    templateUrl:'templates/edit.html'
  });

  $stateProvider.state('add',{
    url:'/add',
    controller:'AddController',
    templateUrl:'templates/edit.html'
  });

  $urlRouterProvider.otherwise('/queue');

});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.controller('QueueController', function($scope,Queue,$state){
  $scope.queue = Queue;
/*
  $scope.queue.$loaded(function(){
    if($scope.queue.length === 0){
      $scope.queue.$add({
        name:'David Cai',
        status:'Added to queue',
        updatedTime:Firebase.ServerValue.TIMESTAMP
      });
      $scope.queue.$add({
        name:'Denis Koletić',
        status:'Added to queue',
        updatedTime:Firebase.ServerValue.TIMESTAMP
      });
    }
  });
  */

  $scope.add = function(){
    $state.go('add');
  };

  $scope.delete = function(song){
    //queueService.deletesong(songId);
    Queue.$remove(song);
  };

});

app.controller('EditController', function($scope,$state,Queue){
  var song = Queue.$getRecord($state.params.songId);
  //$scope.song = angular.copy(queueService.getsong($state.params.songId));
 $scope.song = angular.copy(song);


 //console.log($scope.song);
  $scope.save = function(){
  //  queueService.updatesong($scope.song);
    //$state.go('queue');

    // song.name = $scope.song.name;
    // song.status = $scope.song.status;
    song = $scope.song;
    song.updatedTime = Firebase.ServerValue.TIMESTAMP;
    Queue.$save(song);
    $state.go('queue');
  }

  $scope.delete = function(){
  //  queueService.deletesong($scope.song.id);
      //$state.go('queue');
      Queue.$remove(song);
      $state.go('queue');
    };
});

app.controller('AddController', function($scope,$state,Queue){
    $scope.song = {
        title:'Hosanna',
        artist:'Marco Barrientos',
        chord: 'Bm',
        category: 'Júbilo',
        youtubeUrl: 'https://www.youtube.com/watch?v=nv0ziW48kMs',
        // album: 'Avivanos',
        // creationYear: 2008,
        // isHit: true,
        // ofrenda: false,
        // isNew: false,
        // lyrics: 'Hossana... hosanna.. bla bla (8)...',
        // spotifyUrl: 'https://open.spotify.com/track/4Vi4l3YyI7fk9X8mYOW9Rs',
    };
    $scope.save = function(){
        //  queueService.addsong($scope.song);
        //$state.go('queue');
        $scope.song.updatedTime = Firebase.ServerValue.TIMESTAMP;
        Queue.$add($scope.song);
        $state.go('queue');
    }

});


})();
