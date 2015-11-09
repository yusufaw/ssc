/**
 * Created by ucup_aw on 24/10/15.
 */
angular.module('ok.co', ['ngCordova'])
  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('addLaporan', function ($scope, $cordovaCamera, $cordovaFileTransfer, $cordovaGeolocation, $ionicLoading, $rootScope) {
    $scope.imgURI = "";
    document.addEventListener('deviceready', function () {
      $scope.takePicture = function () {
        var options = {
          quality: 100,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
          // $scope.imgURI = "data:image/jpeg;base64," + imageData;
          $scope.imgURI = imageData;
        }, function (err) {
          // An error occured. Show a message to the user
          alert('error');
        });
      };
    }, false);
    $scope.isSekolah = true;
    $scope.cekSekolah = function (statusSekolah) {
      if (statusSekolah == "0") {
        $scope.isSekolah = true;
      } else {
        $scope.isSekolah = false;
      }
    };

    function cek(xxx) {
      if (xxx == "") {
        return '-';
      }
      else {
        return xxx;
      }
    }

    $scope.simpanLaporan = function (namaAnak, alamatRumah, umur, statusSekolah, namaSekolah, namaOrtu, ketTambahan, lokasiBertemu) {
      //alert($scope.imgURI);
      if ($scope.imgURI == "") {
        alert('Ambil gambar terlebih dahulu');
      }
      else {
        $ionicLoading.show();
        var posOptions = {timeout: 30000, enableHighAccuracy: false};
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            alert("lat " + lat);

            var url1 = "http://tokotani2.16mb.com/public/index.php/Api/add_laporan";
            // var url1 = "http://tokotani.besaba.com/index.php/home/daftar";
            var targetPath = $scope.imgURI;
            var filename = targetPath.split("/").pop();
            var formatFile = targetPath.split(".").pop();
            var options = {
              fileKey: "file",
              fileName: "lapor." + formatFile,
              chunkedMode: false,
              mimeType: "image/" + formatFile,
              params: {
                'lat': lat,
                'lon': lon,
                'namaAnak': cek(namaAnak),
                'alamatRumah': cek(alamatRumah),
                'umur': cek(umur),
                'statusSekolah': statusSekolah,
                'namaSekolah': cek(namaSekolah),
                'namaOrtu': cek(namaOrtu),
                'ketTambahan': cek(ketTambahan),
                'lokasiBertemu': cek(lokasiBertemu)
              }
            };
            $cordovaFileTransfer.upload(url1, targetPath, options)
              .then(function (result) {
                console.log("SUCCESS: " + JSON.stringify(result.response));
                alert("success");
                alert(JSON.stringify(result.response));
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

          }, function (err) {
            // error
            alert("gagal mengambil posisi");
            var url1 = "http://tokotani2.16mb.com/public/index.php/Api/add_laporan";
            // var url1 = "http://tokotani.besaba.com/index.php/home/daftar";
            var targetPath = $scope.imgURI;
            var filename = targetPath.split("/").pop();
            var formatFile = targetPath.split(".").pop();
            var options = {
              fileKey: "file",
              fileName: "lapor." + formatFile,
              chunkedMode: false,
              mimeType: "image/" + formatFile,
              params: {
                'lat': "-",
                'lon': "-",
                'namaAnak': cek(namaAnak),
                'alamatRumah': cek(alamatRumah),
                'umur': cek(umur),
                'statusSekolah': statusSekolah,
                'namaSekolah': cek(namaSekolah),
                'namaOrtu': cek(namaOrtu),
                'ketTambahan': cek(ketTambahan),
                'lokasiBertemu': cek(lokasiBertemu)
              }
            };
            $cordovaFileTransfer.upload(url1, targetPath, options)
              .then(function (result) {
                console.log("SUCCESS: " + JSON.stringify(result.response));
                alert("success");
                alert(JSON.stringify(result.response));
              }, function (err) {
                console.log("ERROR: " + JSON.stringify(err));
                alert(JSON.stringify(err));
              }, function (progress) {
                // constant progress updates
                // $timeout(function () {
                // $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                // })
              });

            $scope.$emit('todo:listChanged');
            $ionicLoading.hide();
          });
      }

    };

    $scope.simpanOffline = function (namaAnak, alamatRumah, umur, statusSekolah, namaSekolah, namaOrtu, ketTambahan, lokasiBertemu) {
      $ionicLoading.show();
      console.log("oy" + statusSekolah);
      if (statusSekolah == "0" || statusSekolah == undefined) {
        statusSekolah = "0";
        namaSekolah = "-";
      }
      var dtLapor = {
        'lat': '-',
        'lon': '-',
        'imgURI': $scope.imgURI,
        'namaAnak': cek(namaAnak),
        'alamatRumah': cek(alamatRumah),
        'umur': cek(umur),
        'statusSekolah': statusSekolah,
        'namaSekolah': cek(namaSekolah),
        'namaOrtu': cek(namaOrtu),
        'ketTambahan': cek(ketTambahan),
        'lokasiBertemu': cek(lokasiBertemu)
      };
      console.log(dtLapor);
      var res = localStorage.getItem('data-laporan');
      if (res == null || res == undefined) {
        localStorage.setItem('data-laporan', JSON.stringify({'array-data': [dtLapor]}));
      } else {
        var obj = JSON.parse(res);
        obj['array-data'].push(dtLapor);
        localStorage.setItem('data-laporan', JSON.stringify(obj));
      }

      console.log(JSON.parse(localStorage.getItem('data-laporan')));
      $scope.$emit('todo:listChanged');
      $ionicLoading.hide();
    };
  });
