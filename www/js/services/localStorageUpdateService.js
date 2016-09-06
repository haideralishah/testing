/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('localStorageUpdateService', function ($http, $state, $q, localStorageService, apiURL) {

    return {
      addToContacts: function (item) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("contacts");
        if (oldData) {
          oldData.push(item);
          localStorageService.setData("contacts", oldData);
          defer.resolve();
        } else {
          localStorageService.setData("contacts", oldData);
          defer.resolve();
        }
        return defer.promise;
      },
      updateToContacts: function (id, item) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("contacts");
        if (oldData) {
          oldData.forEach(function (data, index) {
            if (oldData[index]._id == id) {
              oldData[index] = item;
            }
          });
          localStorageService.setData("contacts", oldData);
          defer.resolve();
        } else {
          defer.reject({status: false, "message": "Error Occured. Please Try Again."});
        }
        return defer.promise;
      }
      ,
      deleteFromContacts: function (id) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("contacts");
        if (oldData) {
          oldData.forEach(function (data, index) {
            if (oldData[index]._id == id) {
              oldData.splice(index, 1);
            }
          });
          localStorageService.setData("contacts", oldData);
          defer.resolve();
        } else {
          defer.reject({status: false, "message": "Error Occured. Please Try Again."});
        }
        return defer.promise;
      }
    }
  })
