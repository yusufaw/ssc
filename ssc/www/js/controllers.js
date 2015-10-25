angular.module('starter.controllers', [])

  .controller('TabCtrl', function ($scope, Chats, $ionicModal, Laporan, $rootScope) {
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
  .controller('DashCtrl', function ($scope, Chats, $ionicModal, Laporan, $rootScope, $cordovaFileTransfer, $ionicLoading) {
    $rootScope.$on('todo:listChanged', function () {
      $scope.closeAddLaporan();
      $scope.items = Laporan.all(201503001);
      var res = localStorage.getItem('data-laporan');
      if (res == null) {
        $scope.belum = [];
      }
      else {
        var obj = JSON.parse(res);
        $scope.belum = obj['array-data'];
        console.log($scope.belum);
      }
    });
    var res = localStorage.getItem('data-laporan');
    if (res == null) {
      $scope.belum = [];
    }
    else {
      var obj = JSON.parse(res);
      $scope.belum = obj['array-data'];
      console.log($scope.belum);
    }

    //$scope.item = {'A', 'B', 'C', 'D'};
    $scope.items = Laporan.all(201503001);
    console.log($scope.items);
    $scope.lapor = function () {
      $scope.openModalPlay();
    };
    $scope.isVerifikasi = function (x) {
      if (x == 0) {
        return "Belum Terverifikasi"
      }
      else if (x == 1) {
        return "Terverifikasi"
      }
      else {
        return "Tidak Terverifikasi"
      }
    };
    $scope.kirimen = function (index) {
      console.log($scope.belum[index].imgURI);

      var url1 = "http://192.168.1.102/SSCAdmin/public/index.php/Api/add_laporan_offline";
      // var url1 = "http://tokotani.besaba.com/index.php/home/daftar";
      var targetPath = $scope.belum[index].imgURI;
      var filename = targetPath.split("/").pop();
      var formatFile = targetPath.split(".").pop();
      var options = {
        fileKey: "file",
        fileName: "lapor." + formatFile,
        chunkedMode: false,
        mimeType: "image/" + formatFile,
        params: {
          'lat': $scope.belum[index].lat,
          'lon': $scope.belum[index].lon,
          'namaAnak': $scope.belum[index].namaAnak,
          'alamatRumah': $scope.belum[index].alamatRumah,
          'umur': $scope.belum[index].umur,
          'statusSekolah': $scope.belum[index].statusSekolah,
          'namaSekolah': $scope.belum[index].namaSekolah,
          'namaOrtu': $scope.belum[index].namaOrtu,
          'ketTambahan': $scope.belum[index].ketTambahan,
          'lokasiBertemu': $scope.belum[index].lokasiBertemu
        }
      };
      $cordovaFileTransfer.upload(url1, targetPath, options)
        .then(function (result) {
          console.log("SUCCESS: " + JSON.stringify(result.response));
          alert("success");
          alert(JSON.stringify(result.response));
          $scope.belum.splice(index, 1);
          console.log("belum : "+$scope.belum);
          //if($scope.belum == []){
          //
          //}
          localStorage.setItem('data-laporan', JSON.stringify({'array-data': [$scope.belum]}));
          //console.log('obj');
          //console.log(obj);

          $scope.items = Laporan.all(201503001);
          var res = localStorage.getItem('data-laporan');
          if (res == null) {
            $scope.belum = [];
          }
          else {
            var obj = JSON.parse(res);
            $scope.belum = obj['array-data'];
            console.log($scope.belum);
          }
        }, function (err) {
          console.log("ERROR: " + JSON.stringify(err));
          alert(JSON.stringify(err));
        }, function (progress) {
          // constant progress updates
          // $timeout(function () {
          // $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          // })
        });

      $ionicLoading.hide();
      $scope.$emit('todo:listChanged');

    };


  })
  .controller('DetailLaporanCtrl', function ($scope, $stateParams, Laporan) {
    $scope.laporan = Laporan.get($stateParams.laporanId);
    $scope.isVerifikasi = function (x) {
      if (x == 0) {
        return "Belum Terverifikasi"
      }
      else if (x == 1) {
        return "Terverifikasi"
      }
      else {
        return "Tidak Terverifikasi"
      }
    };
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })
;
