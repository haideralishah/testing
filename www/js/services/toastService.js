/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
.factory('toastService', function ($cordovaToast, $ionicPopup) {
  return {
    showToast: function (message) {

      if (!!window.cordova) {
        $cordovaToast.showLongBottom(message).then(function (success) {
        }, function (error) {
          console.log(error);
        });
      }
      else {
        $ionicPopup.alert({
          title: 'Alert',
          cssClass: 'activeBackground',
          template: message
        });
      }

    }
  }
})
