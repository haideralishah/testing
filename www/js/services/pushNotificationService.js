/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('pushNotificationService', function ($http, $state, $q, localStorageService, $rootScope) {

    return {
      pushRegister: function () {
        /*$rootScope.push = PushNotification.init({
         android: {
         senderID: "163879100221"
         },
         ios: {
         "gcmSandbox": "false",
         "alert": "true",
         "badge": "true",
         "sound": "true"
         },
         windows: {}
         });

         $rootScope.push.on('registration', function(data) {
         console.log(data);
         localStorageService.setData('userDeviceToken', data.registrationId);
         });*/

        /*$rootScope.push.on('notification', function(data) {
         // data.message,
         // data.title,
         // data.count,
         // data.sound,
         // data.image,
         // data.additionalData
         });

         $rootScope.push.on('error', function(e) {
         // e.message
         });*/
      },

      pushUnregister: function() {
        $rootScope.push.unregister(function() {
          console.log('success unregister');
        }, function() {
          console.log('error');
        });
      }

    }
  })
