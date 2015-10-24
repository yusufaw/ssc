var url = 'http://192.168.1.102/SSCAdmin/public/index.php';
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
              nama : response[i].nama,
              tgl_lapor : response[i].tgl_lapor,
              verifikasi : response[i].verifikasi,
              alamat : response[i].alamat,
              umur : response[i].umur,
              status_sekolah : response[i].status_sekolah,
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


  }).factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'A',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'B',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'C',
      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'D',
      face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'E',
      face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
