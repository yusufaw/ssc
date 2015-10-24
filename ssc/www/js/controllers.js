angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats, $ionicModal, Laporan) {
    //$scope.item = {'A', 'B', 'C', 'D'};
    $scope.items = Laporan.all(201503001);
    console.log($scope.items);
    $scope.lapor = function () {
      $scope.openModalPlay();
    };
    $scope.isVerifikasi = function (x) {
      if(x == 0){
        return "Belum Terverifikasi"
      }
      else if(x == 1){
        return "Terverifikasi"
      }
      else{
        return "Tidak Terverifikasi"
      }
    };
    $ionicModal.fromTemplateUrl('templates/add-laporan.html', {
      scope: $scope,
    }).then(function (modal) {
      $scope.modalPlay = modal;
    });

    $scope.openModalPlay = function () {
      $scope.modalPlay.show();
    };

    $scope.closeAddLaporan = function () {
      $scope.modalPlay.hide();
    };


  })
  .controller('DetailLaporanCtrl', function($scope, $stateParams, Laporan) {
    $scope.laporan = Laporan.get($stateParams.laporanId);
    $scope.isVerifikasi = function (x) {
      if(x == 0){
        return "Belum Terverifikasi"
      }
      else if(x == 1){
        return "Terverifikasi"
      }
      else{
        return "Tidak Terverifikasi"
      }
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
