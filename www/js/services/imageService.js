/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
.factory('imageService',function($http, $state, $q, localStorageService, $cordovaFileTransfer, cloudinary, $ionicLoading, $cordovaImagePicker){
  return{
    getPictures: function(){
      var deferred = $q.defer();
      var options = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
      };
      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          console.log(results);
          fileURL = results[0];
          if(fileURL.length != 0){
            console.log(fileURL);
            deferred.resolve(fileURL);
          }
        }, function(error) {
          deferred.reject(error);
        });
      return deferred.promise
    },


    uploadImage: function(fileURL){
      var deferred = $q.defer();
      var CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/' + cloudinary.config().cloud_name + '/upload';

      console.log(fileURL);
      var uploadOptions = {
        params : { 'upload_preset': cloudinary.config().upload_preset},
        resource_type : "raw"
      };
      $cordovaFileTransfer.upload(CLOUDINARY_UPLOAD_URL, fileURL, uploadOptions)
        .then(function(result) {
          $ionicLoading.show({template : 'Upload Completed', duration: 1000});
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
    }
  }
})
