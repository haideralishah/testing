/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('homeCtrl', function ($scope, $window, $rootScope, $state) {
    $rootScope.fromState = $state.current.name;
    $scope.swiper = {};
    var count = 0;
    $scope.dev_height = $window.innerHeight + "px";

    $scope.onReadySwiper = function (swiper) {
      swiper.on('slideChangeStart', function () {
        console.log('slide start');
      });

      swiper.on('onSlideChangeEnd', function () {
        console.log('slide end');
      });
    };

    $scope.signin = function () {
      $state.go('signin');
    }
  })
