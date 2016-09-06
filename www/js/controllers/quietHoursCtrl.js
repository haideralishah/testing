/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('quietHoursCtrl', function ($scope, $ionicHistory, $rootScope, $state, quietHoursService, localStorageService, validation, toastService) {

    $rootScope.fromState = $state.current.name;
    $scope.userQHStatus = {};
    $scope.userQHStatus.status = false;
    var user = {
      userEmail: localStorageService.getData('userLoginData').userName
    }

    $scope.goBack = function () {
      console.log("test")
      $state.transitionTo('tab.settings');
    }

    /* For Restricting Slider if userQHStatus is not set*/
    $scope.restrictSlider = function () {
      $scope.slider.options.disabled = $scope.userQHStatus.status == true ? false : true;
    }

    /* Getting Quite Hours for user */
    quietHoursService.getQuietHours(user).then(function (response) {
      console.log('res' + JSON.stringify(response));
      if (response.status == true) {
        $scope.slider.minValue = response.message.startTime > 12 ? response.message.startTime - 18 : response.message.startTime;
        $scope.slider.maxValue = response.message.endTime > 12 ? response.message.endTime - 6 : response.message.endTime + 6;
      } else {
        $scope.slider.minValue = 5;
        $scope.slider.maxValue = 11;
      }
      $scope.userQHStatus.status = response.message.userQHStatus == "true" ? true : false;
      $scope.slider.options.disabled = $scope.userQHStatus.status == true ? false : true;
    }, function (error) {
      toastService.showToast('Error loading Quiet Hours');
    })

    /* Setting/updating Quite Hours for user */
    $scope.setQH = function (data) {
      data = {
        "userEmail": user.userEmail,
        "startTime": data.minValue < 6 ? data.minValue + 18 : data.minValue - 6,
        "endTime": data.maxValue < 6 ? data.maxValue + 18 : data.maxValue - 6,
        "userQHStatus": $scope.userQHStatus.status == true ? "true" : "false"
      }
      quietHoursService.setQuietHours(data).then(function (response) {
        if (response.status) {
          toastService.showToast('Quiet Hours Saved');
        }
      }, function (error) {
        toastService.showToast(error.message);
      })
    }


    $scope.slider = {
      minValue: 0,
      maxValue: 18,
      step: 1,
      options: {
        floor: 0,
        ceil: 18,
        noSwitching: true,
        translate: function (value) {
          return '$' + value;
        }
      }
    }


  })
