/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('validation', function () {
    return {
      validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      validateName: function (name) {
        var re = /^[a-zA-Z ]*$/;
        return re.test(name);
      },

      validatePassword: function (password) {
        var re = /^([A-Za-z0-9!@#\$%\^&\*]{5,})$/;
        return re.test(password);
      }
    }
  })
