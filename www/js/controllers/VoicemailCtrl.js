/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('VoicemailCtrl', function ($scope, MediaManager) {
    var urlprefix = '/android_asset/www/audio/';

    $scope.dynamicTrack = {};

    $scope.tracks = [
      {
        url: 'https://s3.amazonaws.com/recordings_2013/17d26bda-060f-11e6-a16a-842b2b4be7e2.mp3',
        artist: 'Genesis',
        title: 'Land of Confusion'
      }

    ];

    $scope.stopPlayback = function () {
      MediaManager.stop();
    };
    $scope.playTrack = function (index) {
      $scope.dynamicTrack = $scope.tracks[index];

      $scope.togglePlayback = !$scope.togglePlayback;
    }
  })
