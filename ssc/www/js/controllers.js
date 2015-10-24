angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats, $ionicModal) {
    //$scope.item = {'A', 'B', 'C', 'D'};
    $scope.items = Chats.all();
    $scope.lapor = function () {
      $scope.openModalPlay();
    };
    $ionicModal.fromTemplateUrl('templates/add-laporan.html', {
      scope: $scope,
    }).then(function (modal) {
      $scope.modalPlay = modal;
    });

    $scope.openModalPlay = function () {
      $scope.modalPlay.show();
    };

    $scope.closeModalPlay = function () {
      $scope.modalPlay.hide();
    };
  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
;
