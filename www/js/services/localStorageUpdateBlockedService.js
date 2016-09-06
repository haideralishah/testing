/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('localStorageUpdateBlockedService', function ($http, $state, $q, localStorageService, apiURL) {

    return {
      addToBlocked: function (item) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("blockedContacts");
        if (oldData) {
          oldData.push(item);
          localStorageService.setData("blockedContacts", oldData);
          defer.resolve();
        } else {
          localStorageService.setData("blockedContacts", oldData);
          defer.resolve();
        }
        return defer.promise;
      },

      deleteFromBlocked: function (id) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("blockedContacts");
        if (oldData) {
          oldData.forEach(function (data, index) {
            if (oldData[index]._id == id) {
              oldData.splice(index, 1);
            }
          });
          localStorageService.setData("blockedContacts", oldData);
          defer.resolve();
        } else {
          defer.reject({status: false, "message": "Error Occured. Please Try Again."});
        }
        return defer.promise;
      }
    }
  })
