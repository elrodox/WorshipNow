var app = angular.module('worshipnow');



app.controller("userLoginController", function($scope, Auth) {
    $scope.auth = Auth;
    
    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });
});