var app = angular.module('worshipnow');

app.controller('SetListController', function($scope, songsService, setListService, $state){
  $scope.songs = setListService;
  $scope.remove = function(song){
    var editedSong = songsService.$getRecord(song.songIdReference);
    setListService.$remove(song);
    editedSong.inSetList = false;
    songsService.$save(editedSong);
  }
});

app.controller('SongController', function($scope,songsService, setListService, $state, FireRef){
  $scope.songs = songsService;
  console.log($scope.songs);

  $scope.swipeRight = function(){
    console.log("hola!");
  }

  $scope.add = function(){
    $state.go('songs_add');
  };

  $scope.edit = function(song){
    $state.go('songs_edit', {'songId': song.$id});
  };

  $scope.delete = function(song){
    songsService.$remove(song);
  };


  $scope.addToSetList = function(song){
    song.inSetList = true;
    songsService.$save(song);
    song.songIdReference = song.$id;
    setListService.$add(song);
    
    
    // var lastPositionRef = FireRef.child('last_setList_position');
    // var lastPositionObj = $firebaseObject(lastPositionRef);
    

    // lastPositionObj.$loaded().then(function() {
    //   if ( lastPositionObj.$value == null || lastPositionObj.$value == undefined ){
    //     lastPositionObj.$value = 1;
    //   }else{
    //     lastPositionObj.$value = lastPositionObj.$value + 1;
    //   }
    //   console.log("lastPositionObj (id, value):", lastPositionObj.$id, lastPositionObj.$value);

    //   song.position = lastPositionObj.$value;
    //   setListService.$add(song);
    //   songsService.$save(song);
    // });

    
  }

});

app.controller('EditController', function($scope,$state,songsService){
  var editedSong = songsService.$getRecord($state.params.songId)
  $scope.song = angular.copy(editedSong);

  // $scope.song = angular.copy( songsService.$getRecord($state.params.songId) );
  // $scope.song = songsService.$getRecord($state.params.songId);
  // var old_data_song = angular.copy($scope.song);

  $scope.save = function(){

    editedSong.title = $scope.song.title;
    editedSong.artist = $scope.song.artist;
    editedSong.chord = $scope.song.chord;
    editedSong.category = $scope.song.category;
    editedSong.youtubeUrl = $scope.song.youtubeUrl;
    // editedSong.inSetList = $scope.song.inSetList;
    editedSong.updatedTime = Firebase.ServerValue.TIMESTAMP;
    songsService.$save(editedSong);
    

    // $scope.song.updatedTime = Firebase.ServerValue.TIMESTAMP;
    // songsService.$save($scope.song);
    
    $state.go('tabsController.song_list');

  }

  $scope.delete = function(){
      songsService.$remove(editedSong);
      $state.go('tabsController.song_list');
      // songsService
  };
  $scope.backToSongList = function(){
      // songsService.$remove(editedSong);
      $state.go('tabsController.song_list');
      // $scope.song = old_data_song;
  };
});

app.controller('AddController', function($scope,$state,songsService){
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
    $scope.backToSongList = function(){
      // songsService.$remove(editedSong);
      $state.go('tabsController.song_list');
      // $scope.song = old_data_song;
    };
    $scope.save = function(){
        $scope.song.updatedTime = Firebase.ServerValue.TIMESTAMP;
        $scope.song.inSetList = false;
        songsService.$add($scope.song);
        $state.go('tabsController.song_list');
    }

});