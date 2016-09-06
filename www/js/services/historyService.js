/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('historyService',function($http, $state, $q,localStorageService,apiURL) {

    return {

      getHomeHistory : function () {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.get(apiURL + '/getUserCallsInfo', config)
          .then(function (response) {
            if (response.status == 200) {
              localStorageService.setData("userCallsInfo", response.data.message);
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              console.log(error);

              if(error.statusText == "Unauthorized"){

                defer.reject({status: false, "message": "Error Occured. Please Try Again."  });
              }

            }
          })
        return defer.promise;
      },

      getHistoryWithOffset: function (offset) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        config.headers = header;
        $http.get(apiURL + '/getUserCallsInfo_offset/'+offset, config)
          .then(function (response) {
            if (response.status == 200) {
              localStorageService.setData("userCallsInfo", response.data.message);
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              console.log(error);

              if(error.statusText == "Unauthorized"){

                defer.reject({status: false, "message": "Error Occured. Please Try Again."  });
              }

            }
          })
        return defer.promise;
      }
    }
  })
