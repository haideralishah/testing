/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('strangerService', function($http, $state, $q, localStorageService, apiURL){
    return {
      moveStranger: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.post(apiURL + '/moveStrangerToBlock', data, config)
          .then(function (response) {
            console.log(response)
            if (response.status) {
              defer.resolve(response.data);
            }
            else {
              console.log(response.message)
              defer.reject({status: false, "message": "Stranger Not Moved"});
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
