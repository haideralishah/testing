/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('contactNumberDetailCtrl', function ($rootScope, $state, $scope, $ionicHistory, $stateParams, localStorageService) {
    console.log($rootScope.fromState);


    function search(contactId, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i]._id === contactId) {
          console.log(myArray[i])
          return myArray[i];
        }
      }
    }

    $scope.contactInfo = search($stateParams.id, localStorageService.getData('userCallsInfo'));

    console.log($scope.contactInfo);

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

  })
