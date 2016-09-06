/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('blockedService', function($http, $state, $q, localStorageService, apiURL){
    return {
      deleteBlocked: function (number) {
        var defer = $q.defer();

        var config = {};

        var blockedNumber = {
          blockedNumber: number
        }

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.post(apiURL + '/deleteBlocked', blockedNumber, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status) {
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

      getBlocked: function () {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.get(apiURL + '/getBlockedNumber', config)
          .then(function (response) {
            console.log(response);
            if (response.status) {
              response.data.message.forEach(function(data,ind){
                response.data.message[ind].firstName = data.blockedName;
              })
              localStorageService.setData("blockedContacts", response.data.message);
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

      saveBlocked : function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;
        newBlockedNumber = {
          userEmail: data.userEmail,
          blockedName: data.blockedName?data.blockedName:(data.contactFirstName+data.contactLastName?" "+data.contactLastName:""),
          blockedNumber: data.blockedNumber?data.blockedNumber:data.fromCaller
        }
        $http.post(apiURL + '/saveBlockedNumber', newBlockedNumber, config)
          .then(function (response) {
            console.log(response);
            if (response.status) {
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

      updateBlocked: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.post(apiURL + '/updateBlockedContact', data, config)
          .then(function (response) {
            console.log(response);
            if (response.status) {
              //alert(response.status);
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
      isAlreadyBlocked: function (data) {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }
        config.headers = header;
        $http.post(apiURL + '/isInBlocked', {"userEmail": data.userEmail,"number":data.number}, config)
          .then(function (response) {
            if (response.status) {
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
