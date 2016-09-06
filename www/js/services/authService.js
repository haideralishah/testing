/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('authService', function ($http, $state, $q, localStorageService, apiURL,$rootScope) {
    return {
      signUp: function (data) {
        var defer = $q.defer();
        $http.post(apiURL + "/signup", data)
          .then(function (response) {
            console.log(response);
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

      logIn: function (data) {
        data.userDeviceToken = localStorageService.getData('userDeviceToken');
        if(ionic.Platform.isIOS()){
          data.userDeviceType = "IOS"
        }
        else{
          data.userDeviceType = "Android"
        }

        var defer = $q.defer();
        $http.post(apiURL + "/signin", data)
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              response.data.userName = response.config.data.userEmail
              localStorageService.setData("userLoginData", response.data);
              $rootScope.fetchUserInfo = true;
              defer.resolve();
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error.status == '401') {
              defer.reject({status: false, "message": "Invalid Username or Password"});
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },
      changePassword : function (data){
        var defer = $q.defer();
        $http.post(apiURL + '/changePassword', data)
          .then(function (response) {
            if (response.status == 200) {
              defer.resolve('Successfully change password');
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
      verifyEmail : function (data) {
        data.userDeviceToken = localStorageService.getData('userDeviceToken');
        if(ionic.Platform.isIOS()){
          data.userDeviceType = "IOS"
        }
        else{
          data.userDeviceType = "Android"
        }
        var defer = $q.defer();
        $http.get(apiURL + "/forgetPassword/"+ data.userEmail  , data)
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              response.data.userName = response.data.userEmail;
              defer.resolve({status: false, "message":  response.data.message });
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error.status == '401') {
              defer.reject({status: false, "message": "Invalid Username or Password"});
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          });
        return defer.promise;
      },
      logout: function (){

        var defer = $q.defer();

        var config = {};
        var data = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header


        $http.post(apiURL + '/logout',data, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200 && response.data && response.data.status) {
              defer.resolve('Successfully Logout');
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

      updateUserOutgoingCalls: function (data){

        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        };

        config.headers = header;

        $http.post(apiURL + '/updateUserOutgoingCalls', data, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          });
        return defer.promise;

      },

      getUserInfo: function(){
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header


        $http.get(apiURL + '/getUserInfo', config)
          .then(function (response) {
            console.log(response);
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
