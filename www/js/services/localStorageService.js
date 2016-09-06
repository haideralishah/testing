/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')



  /*Service For handling LocalStorage*/
  .factory('localStorageService', function () {
    return {
      setData: function (objectKey, data) {
        localStorage.setItem(objectKey, JSON.stringify(data));
      },
      getData: function (objectKey) {
        if (JSON.parse(localStorage.getItem(objectKey) != null)) {
          return JSON.parse(localStorage.getItem(objectKey));
        } else {
          return localStorage.setItem(objectKey, null);
        }
      }
    }
  });
