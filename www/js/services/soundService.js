/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory('soundService',function(apiURL,$http, $state, $q, localStorageService, $cordovaFileTransfer, cloudinary, $ionicLoading, $cordovaCapture,toastService){

    var fileUrl = '';
    return{
      fileUrl: fileUrl,
      getSound: function(){
        var deferred = $q.defer();
        var options = {limit: 1, duration: 10, format:"audio/wav"};
        $cordovaCapture.captureAudio(options).then(function (audioData) {
          console.log(audioData)
          deferred.resolve(audioData[0].fullPath);
        }, function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise
      },


      uploadSound: function(fileURL){
        var deferred = $q.defer();
        var CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/' + cloudinary.config().cloud_name + '/video/upload';

        console.log(fileURL);
        var uploadOptions = {
          params : { 'upload_preset': cloudinary.config().upload_preset}
        };
        $cordovaFileTransfer.upload(CLOUDINARY_UPLOAD_URL, fileURL, uploadOptions)
          .then(function(result) {
            $ionicLoading.show({template:'' , duration: 1000});
            toastService.showToast("Please tap save button to update message.");
            console.log(result);
            var response = JSON.parse(decodeURIComponent(result.response));
            deferred.resolve(response);
          }, function(err) {
            console.log(err)
            $ionicLoading.show({template : 'Upload Failed', duration: 3000});
            deferred.reject(err);
          }, function (progress) {
            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
          });
        return deferred.promise
      },

      saveVoiceMessages: function (data) {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        };
        config.headers = header;
        $http.post(apiURL + '/setVoiceMessage', data, config)
          .then(function (response) {
            //console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              console.log('Updated')
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
