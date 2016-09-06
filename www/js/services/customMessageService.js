/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('customMessageService',function($http, $state, $q,localStorageService,apiURL) {

    return {
      getCustomMessageInfo: function () {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        };
        config.headers = header;
        $http.get(apiURL + '/getVoiceMessage', config)
          .then(function (response) {
            if (response.data.status == true) {
              console.log(response.data.message);
              /*    localStorageService.setData("userVoicemails", response.data.message);*/
              defer.resolve(response.data);
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          });
        return defer.promise;
      },
      postCustomMessageInfo: function (data) {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        };
        config.headers = header;
        $http.post(apiURL + '/setVoiceMessage',data,config)
          .then(function (response) {
            if (response.data.status == true) {
              /*    localStorageService.setData("userVoicemails", response.data.message);*/
              defer.resolve(response.data);
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          });
        return defer.promise;
      },
      updateDefaultCustomMessage: function (data) {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        };
        config.headers = header;
        var updateData = {};
        updateData.userEmail = localStorageService.getData("userInfo").userEmail;
        updateData.updateType = data;
        $http.post(apiURL + '/resetToDefaultVoiceMessage',updateData,config)
          .then(function (response) {
            if (response.data.status == true) {
              /*    localStorageService.setData("userVoicemails", response.data.message);*/
              defer.resolve(response.data);
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          });
        return defer.promise;
      }
    }
  })
