angular.module('starter.controllers')
  .controller('customVoiceMessagesCtrl', function (toastService, $http, $scope, $cordovaMedia, MediaManager, soundService, customMessageService, $state, $interval,$ionicPopup,$ionicLoading) {

    $scope.goBack = function () {
      console.log("test");
      $scope.StopPlay();
      $state.transitionTo('tab.settings');
    };

    /**
     * Code For playing Audios and UI changes Start
     */

    $scope.isPlaying = false;
    $scope.userVoiceMessageObject = {};

    $scope.currentMessage = {};
    $scope.currentMessage.currentTime = 0;
    $scope.currentMessage.currentSeekTime = 0;

    /**
     * Toggling UI based on header click or button click
     */

    $scope.openedDetails = {"first": false, "second": false, "third": false};

    $scope.toggleActiveBox = function (i) {
      for (k in $scope.openedDetails) {
        if (k == i) {
          $scope.openedDetails[k] = !$scope.openedDetails[k];
        } else {
          $scope.openedDetails[k] = false;
        }
      }
      /**
       * Resetting variables
       */
      $scope.currentMessage.currentTime = 0;
      $scope.currentMessage.currentSeekTime = 0;
      $scope.isPlaying = false;
      $scope.StopPlay(); //Stopping if any audio is playing currently
      console.log("$scope.openedDetails", $scope.openedDetails);
    }

    /**
     * Fetching Audio Files From Server
     */

    customMessageService.getCustomMessageInfo().then(function (success) {
      if (success.default) {
        toastService.showToast('You have default voice messages.');
      }
      if (success.message && success.message[0]) {
        for (k in success.message[0]) {
          if (k.indexOf("voice") >= 0 && k.indexOf("Duration") == -1) {
            $scope.userVoiceMessageObject[k] = success.message[0][k];
          } else if (k.indexOf("voice") >= 0 && k.indexOf("Duration") > 1) {
            $scope.userVoiceMessageObject[k] = success.message[0][k] < 10 ? "0" + Math.ceil(success.message[0][k]) : Math.ceil(success.message[0][k]);
          }
        }
      }
      console.log(success);
    }, function (fail) {
      console.log(fail);
    });

    /**
     * For palying audio
     */

    var abc;
    var my_media;

    var mediaStatusCallback = function(status) {
      if(status == 1) {
        $ionicLoading.show({template: '<ion-spinner icon="lines"></ion-spinner>'});
      } else {
        $ionicLoading.hide();
      }
    }


    $scope.playCurrentMessage = function (url, dur) {
      $scope.my_media = new Media(url,
        function () {
          $scope.currentMessage.currentTime = 0;
          $scope.currentMessage.currentSeekTime = 0;
          $interval.cancel(abc);
          $scope.isPlaying = false;
          console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
          console.log("playAudio():Audio Error: ", err);
        },mediaStatusCallback);
      $scope.currentMessage.currentTime = dur / 1;
      $scope.my_media.play();
      $scope.isPlaying = true;
      abc = $interval(function () {
        var lastSec;
        $scope.my_media.getCurrentPosition(function (sec) {
          if (sec > 0 && lastSec != Math.floor(sec)) {
            $scope.currentMessage.currentTime--;
            $scope.currentMessage.currentSeekTime++;
            lastSec = Math.floor(sec);
          } else {
            lastSec = Math.floor(sec);
          }
        })
      }, 1000)
    }

    /**
     * For Stopping the current palying audio
     */
    $scope.StopPlay = function () {
      $scope.currentMessage.currentTime = 0;
      $scope.currentMessage.currentSeekTime = 0;
      if ($scope.my_media) {
        $scope.my_media.stop();
      }
      $scope.isPlaying = false;
      $interval.cancel(abc);
    }

    /**
     * Code For playing Audios and UI changes Ended
     */

    /**
     * Edit and Upload Custom Message Function
     */

    $scope.editCustomMessage = function (type) {
      soundService.getSound().then(function (data) {
        soundService.uploadSound(data)
          .then(function (success) {
            if (type == "quite") {
              $scope.userVoiceMessageObject.voiceQuiteHours = success.url;
              $scope.userVoiceMessageObject.voiceQuiteHoursDuration = success.duration < 10 ? "0" + Math.ceil(success.duration) : Math.ceil(success.duration);
            } else if (type == "stranger") {
              $scope.userVoiceMessageObject.voiceStranger = success.url;
              $scope.userVoiceMessageObject.voiceStrangerDuration = success.duration < 10 ? "0" + Math.ceil(success.duration) : Math.ceil(success.duration);
            } else if (type == "contact") {
              $scope.userVoiceMessageObject.voiceContacts = success.url;
              $scope.userVoiceMessageObject.voiceContactsDuration = success.duration < 10 ? "0" + Math.ceil(success.duration) : Math.ceil(success.duration);
            }
            console.log("for parsing data" + success);
            console.log('data about uploading', success.url);
          }, function (error) {
            console.log(error);
          })
      }, function (error) {
        console.log(error);
      })
    };

    /**
     * Edit and Upload Custom Message Ended
     */

    /*
    * Saving uploaded Custom Message Function
    */

    $scope.saveVoiceMessage = function () {
      var data = {
        quitehours: $scope.userVoiceMessageObject.voiceQuiteHours,
        voicequitehoursduration: $scope.userVoiceMessageObject.voiceQuiteHoursDuration,
        voiceStranger: $scope.userVoiceMessageObject.voiceStranger,
        voiceStrangerDuration: $scope.userVoiceMessageObject.voiceStrangerDuration,
        voiceContacts: $scope.userVoiceMessageObject.voiceContacts,
        voiceContactsDuration: $scope.userVoiceMessageObject.voiceContactsDuration,
        voiceMail: "",
        voiceMailDuration: ""
      };
      customMessageService.postCustomMessageInfo(data)
        .then(function (success) {
          console.log(success);
          toastService.showToast('Custom Message Saved');
        }, function (err) {
          console.log(err);
        });
    };

    /*
     * Saving uploaded Custom Message Function Ended
     */
     /*Set Default voice*/
    $scope.resetDefaultMessage=function(data){
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm',
        template: 'Are you sure you want to change back to the default message?',
        cssClass: 'stylingConfirmButton'
      });
      confirmPopup.then(function(res) {
        if(res) {
          customMessageService.updateDefaultCustomMessage(data).then(function (success) {
            if(data==1){
              $scope.userVoiceMessageObject.voiceQuiteHours = success.data.voiceQuiteHours;
              $scope.userVoiceMessageObject.voiceQuiteHoursDuration = success.data.voiceQuiteHoursDuration;
            }else if(data==3){
              $scope.userVoiceMessageObject.voiceContacts = success.data.voiceContacts;
              $scope.userVoiceMessageObject.voiceContactsDuration = success.data.voiceContactsDuration;
            }else if(data==2){
              $scope.userVoiceMessageObject.voiceStranger = success.data.voiceStranger;
              $scope.userVoiceMessageObject.voiceStrangerDuration = success.data.voiceStrangerDuration;
            }
            toastService.showToast("Custom message reset to default.");
            console.log(success);
          }, function (fail) {
            console.log(fail);
          });
        }
      });
    }


  })
