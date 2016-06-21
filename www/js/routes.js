
var app = angular.module('worshipnow');

app.config(function($stateProvider,$urlRouterProvider){

  // $stateProvider.state('songs',{
  //   url:'/songs',
  //   templateUrl:'templates/songs/list.html'
  // });

  $stateProvider.state('songs_edit',{
    url:'/songs/edit/:songId',
    controller:'EditController',
    templateUrl:'templates/songs/edit.html'
  });

  $stateProvider.state('songs_add',{
    url:'/songs/add',
    controller:'AddController',
    templateUrl:'templates/songs/edit.html'
  });


  $stateProvider
  .state('tabsController.historial', {
    url: '/history',
    views: {
      'tab1': {
        templateUrl: 'templates/history.html'
      }
    }
  })  
  .state('tabsController.song_list', {
    url: '/song_list',
    views: {
      'tab2': {
        templateUrl: 'templates/songs/list.html'
      }
    }
  })
  // .state('tabsController.song_edit', {
  //   url: '/songs/edit/:songId',
  //   controller:'EditController',
  //   views: {
  //     'tab2': {
  //       templateUrl: 'templates/songs/edit.html'
  //     }
  //   }
  // })
  .state('tabsController.setList', {
    url: '/set_list',
    views: {
      'tab3': {
        templateUrl: 'templates/setList.html'
      }
    }
  })
  .state('tabsController', {
    url: '/tabs_controller',
    abstract:true,
    templateUrl: 'templates/tabsController.html'
  })
  ;

  $urlRouterProvider.otherwise('/tabs_controller/song_list');
  // $urlRouterProvider.otherwise('/songs');

});