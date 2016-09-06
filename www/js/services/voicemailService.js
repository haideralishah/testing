/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')

  .factory('voicemailService',function($http, $state, $q,localStorageService,apiURL) {

    return {
      getVoiceMailInfo: function () {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.get(apiURL + '/getUserVoiceMailInfo', config)
          .then(function (response) {
            //console.log('this' + JSON.stringify(response));
            if (response.data.status == true) {
              console.log(response.data.message)
              localStorageService.setData("userVoicemails", response.data.message);
              defer.resolve(response.data);
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },


      updateVoiceMailInfo: function (id) {
        var defer = $q.defer();


        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;
        var data = {
          _id : id
        }

        $http.post(apiURL + '/updateVoicemailNotification', data, config)
          .then(function (response) {
            //console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              console.log('Updated')
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

      getNotificationCount: function () {
        var defer = $q.defer();


        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;


        $http.get(apiURL + '/getNotificationCount', config)
          .then(function (response) {
            if (response.data.status == true) {
              defer.resolve(response.data);
              console.log(response.data)
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      deleteVoiceMail: function (id) {
        var defer = $q.defer();


        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        var data = {}

        config.headers = header;

        $http.post(apiURL + '/deleteVoiceMail/' + id, data, config)
          .then(function (response) {
            //console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              console.log('Updated')
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
