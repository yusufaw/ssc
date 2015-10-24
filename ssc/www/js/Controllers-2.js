/**
 * Created by ucup_aw on 24/10/15.
 */
angular.module('ok.co', [])
  .controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  })
  
  .controller('addLaporan', function($scope) {
  	$scope.test = function(){
  		alert("aaa");
  	};
  });

