var url = 'http://crevion.net/ssc/public/index.php';
angular.module('starter.services', [])

  .service('Laporan', function ($http) {
    var ress = [];
    return {
      all: function (uname) {
        $http.get(url + '/Api/get_laporan/' + uname).success(function (response) {
          console.log(response);
          for(var i = (response.length-1); i >= 0; i--){
            ress[response.length-i-1] = {
              id : response.length-i-1,
              gambar : "http://crevion.net/ssc/public/content/laporan/"+response[i].id_lapor+".jpg",
              nama : response[i].nama,
              tgl_lapor : response[i].tgl_lapor,
              verifikasi : response[i].verifikasi,
              alamat : response[i].alamat,
              umur : response[i].umur,
              status_sekolah : response[i].status_sekolah,
              nama_sekolah : response[i].nama_sekolah,
              ortu : response[i].ortu,
              lat : response[i].lat,
              lon : response[i].lon,
              ket_tambahan : response[i].ket_tambahan,
            };
          }
          return ress;

        }).error(function (err) {
          ress = 'error : ' + err;
          return ress;
        });
        return ress;
      },
      get : function (id) {
        console.log(id);
        return ress[id];
      }
    }


  }).service('User', function ($http) {

    var ress=[];
    return {
      get: function (uname) {
        $http.get(url + '/Api/get_profil/' + uname).success(function (response) {
          ress[0] = response;
          //console.log(response);
          return ress;

        }).error(function (err) {
          ress = 'error : ' + err;
          return ress;
        });
        return ress;
      }
    }


  });
