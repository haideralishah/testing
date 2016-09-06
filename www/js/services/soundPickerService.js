/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
  .factory("soundPickerService", function () {

    var currentMessageToBePlayed = {};

    var contactSound = {};
    var contactDuration = 0;

    var quiteSound = {};
    var quiteDuration = 0;


    var strangerSound = {};
    var strangerDuration = 0;

    var voiceSound = {};
    var voiceDuration = 0;


    var setCurrentMessageToBePlayed = function (url, dur) {
      currentMessageToBePlayed.url = url;
      currentMessageToBePlayed.dur = dur;
    }


    var getCurrentMessageToBePlayed = function () {
      return currentMessageToBePlayed;
    }

    var setSound = function (sound, duration, param) {
      if (param == "contact") {
        contactSound.url = sound;
        contactSound.duration = duration;
      }
      if (param == "quite") {
        quiteSound.url = sound;
        quiteSound.duration = duration;
      }
      if (param == "stranger") {
        strangerSound.url = sound;
        strangerSound.duration = duration;
      }
      if (param == "voice") {
        voiceSound.url = sound;
        voiceSound.duration = duration;
      }
    };
    var getSound = function (param) {
      if (param == "contact") {
        return contactSound;
      }
      if (param == "quite") {
        return quiteSound;
      }
      if (param == "stranger") {
        return strangerSound;
      }
      if (param == "voice") {
        return voiceSound;
      }
    };
    var setDuration = function (duration, param) {
      if (param == "contact") {
        contactDuration = duration;
      }
      if (param == "quite") {
        var quiteDuration = duration;
      }
      if (param == "stranger") {
        var strangerDuration = duration;
      }
      if (param == "voice") {
        var voiceDuration = duration;
      }
    };
    var getDuration = function (param) {
      if (param == "contact") {
        return contactDuration;
      }
      if (param == "quite") {
        return quiteDuration;
      }
      if (param == "stranger") {
        return strangerDuration;
      }
      if (param == "voice") {
        return voiceDuration;
      }
    };
    return {
      setSound: setSound,
      getSound: getSound,
      setDuration: setDuration,
      getDuration: getDuration,
      getCurrentMessageToBePlayed: getCurrentMessageToBePlayed,
      setCurrentMessageToBePlayed: setCurrentMessageToBePlayed
    }
  })
  .filter('digits', function () {
    return function (input) {
      if (input < 10) {
        input = '0' + input;
      }

      return input;
    }
  })
