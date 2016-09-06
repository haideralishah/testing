/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('contactsService', function ($http, $state, $q, localStorageService, apiURL) {

    return {
      getContacts: function (user) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.get(apiURL + '/getContacts', config)
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

      saveContacts: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header

        $http.post(apiURL + '/saveContacts', data, config)
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

      updateContact: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header

        $http.post(apiURL + '/updateContact', data, config)
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
      deleteContact: function (id) {
        var defer = $q.defer();

        var config = {};

        var _id = {
          _id: id
        }

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.post(apiURL + '/deleteContact', _id, config)
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
      isAlreadyAContact: function (data) {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }
        config.headers = header;

        $http.post(apiURL + '/isInContact', {"userEmail": data.userEmail,"number":data.number}, config)
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
