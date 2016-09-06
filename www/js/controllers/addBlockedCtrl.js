/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('addBlockedCtrl', function ($scope, $ionicHistory, $state, $rootScope, localStorageService, blockedService, toastService, contactsService) {
    $rootScope.fromState = $state.current.name;
    $scope.block = {
      blockedName: '',
      blockedNumber: ''
    }

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }


    $scope.saveBlockedContact = function (data) {

      data.blockedNumber = $rootScope.ccodeMask(data.blockedNumber);

      data.userEmail = localStorageService.getData('userLoginData').userName;
      blockedService.saveBlocked(data).then(function (response) {
        console.log(response);
        $rootScope.refreshHistory = true;
        $rootScope.fetchBlocked = true;
        $state.go('tab.personal-blockList');
        toastService.showToast('Blocked Contact Added');
      }, function (err) {
        console.log(err)
        toastService.showToast(err.message);
      })
    }

    /*$scope.saveBlockedContact = function (data) {

     data.blockedNumber = $rootScope.ccodeMask(data.blockedNumber);
     data.userEmail = localStorageService.getData('userLoginData').userName;
     $scope.isAlreadyContact = {"userEmail": data.userEmail, "number": $scope.block.blockedNumber};
     contactsService.isAlreadyAContact($scope.isAlreadyContact).then(function (isAlreadyAContactData) {
     if (isAlreadyAContactData.message && isAlreadyAContactData.message.isFound) {
     toastService.showToast("Phone number "+$scope.block.blockedNumber +" already exists in [contact name] Contact.");
     } else if (isAlreadyAContactData.message && isAlreadyAContactData.message.isFound == false) {
     blockedService.saveBlocked(data).then(function (response) {
     console.log(response);
     $rootScope.refreshHistory = true;
     $rootScope.fetchBlocked = true;
     $state.go('tab.personal-blockList');
     toastService.showToast('Blocked Contact Added');
     }, function (err) {
     console.log(err)
     toastService.showToast(err.message);
     })
     }
     }, function (err) {
     console.error(err);
     })
     }*/
  })

