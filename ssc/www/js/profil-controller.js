/**
 * Created by ucup_aw on 24/10/15.
 */

angular.module('pro.co', [])
  .controller('AccountCtrl', function($scope, User) {
    $scope.user = User.get(1);
    console.log($scope.user);
  });
