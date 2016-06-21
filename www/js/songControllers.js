var app = angular.module('worshipnow');

app.controller('SongController', function($scope,songsService,$state){
  $scope.songs = songsService;

  $scope.add = function(){
    $state.go('songs_add');
  };

  $scope.delete = function(song){
    songsService.$remove(song);
  };

});

app.controller('EditController', function($scope,$state,songsService){
  var editedSong = songsService.$getRecord($state.params.songId);
  $scope.song = angular.copy(editedSong);

  $scope.save = function(){

    editedSong.title = $scope.song.title;
    editedSong.artist = $scope.song.artist;
    editedSong.chord = $scope.song.chord;
    editedSong.category = $scope.song.category;
    editedSong.youtubeUrl = $scope.song.youtubeUrl;

    editedSong.updatedTime = Firebase.ServerValue.TIMESTAMP;
    songsService.$save(editedSong);
    $state.go('tabsController.song_list');

  }

  $scope.delete = function(){
      songsService.$remove(editedSong);
      $state.go('tabsController.song_list');
  };
  $scope.backToSongList = function(){
      // songsService.$remove(editedSong);
      $state.go('tabsController.song_list');
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
    $scope.save = function(){
        $scope.song.updatedTime = Firebase.ServerValue.TIMESTAMP;
        songsService.$add($scope.song);
        $state.go('tabsController.song_list');
    }

});