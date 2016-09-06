/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('quietHoursService', function ($http, $state, $q, localStorageService, apiURL) {

    return {
      getQuietHours: function (user) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header


        $http.get(apiURL + '/getQuietHours', config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      setQuietHours: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header

        $http.post(apiURL + '/saveQuietHours', data, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      }

    }
  })
