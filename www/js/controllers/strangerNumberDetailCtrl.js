/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('strangerNumberDetailCtrl', function ($rootScope, $state, $scope, $stateParams, localStorageService, strangerService, toastService, localStorageUpdateBlockedService) {
    console.log($stateParams.id);
    $scope.strangerInfo = {};

    function search(strangerId, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i]._id === strangerId) {
          console.log(myArray[i]);
          return myArray[i];
        }
      }
    }

    $scope.strangerInfo = search($stateParams.id, localStorageService.getData('userCallsInfo'));
    console.log($scope.strangerInfo);
    if ($scope.strangerInfo.call_direction == 'outbound') {
      $scope.strangerInfo.number = $scope.strangerInfo.toCaller
    }
    else if ($scope.strangerInfo.call_direction == 'inbound') {
      $scope.strangerInfo.number = $scope.strangerInfo.fromCaller
    }
    console.log($scope.strangerInfo)

    $scope.goBack = function () {
      if ($rootScope.fromState == 'tab.dash') {
        $state.transitionTo('tab.dash');
      }

      if ($rootScope.fromState == 'tab.history') {
        $state.transitionTo('tab.history');
      }
    }

    $scope.goTo = function () {
      $state.go('tab.add-contacts', {'number': $scope.strangerInfo.number});
    }

    $scope.moveStranger = function (strangerInfo) {
      strangerService.moveStranger(strangerInfo).then(function (response) {
        console.log(response);
        if (response.status == true) {
          $rootScope.refreshHistory = true;
          $rootScope.fetchBlocked = true;
          toastService.showToast('Stranger moved to Blocklist');
          $state.go('tab.dash');
          localStorageUpdateBlockedService.addToBlocked(response.message)

        }
        else {
          toastService.showToast('Error Occured, Please try later');
        }

      }, function (error) {
        console.log(error)
        toastService.showToast(error.message);
      })
    }

  })
