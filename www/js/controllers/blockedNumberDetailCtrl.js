/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('blockedNumberDetailCtrl', function ($rootScope, $state, $scope, $timeout, $ionicHistory, $stateParams, localStorageService, $ionicPopup, blockedService, toastService, localStorageUpdateBlockedService) {
    console.log($rootScope.fromState);
    console.log($stateParams.number);
    var searchedContact = '';


    $scope.editContacts = function () {
      $timeout(function () {
        $scope.enableEdit2 = true;
        $scope.enableEdit = true;
      }, 50);
    }

    $scope.cancelEditing = function () {
      $scope.enableEdit = false;
      $scope.enableEdit2 = false;
    }

    $scope.saveBlockedContact = function (data) {
      blockedService.updateBlocked(data).then(function (data) {
        $rootScope.refreshHistory = true;
        $rootScope.fetchBlocked = true;
        $state.go('tab.personal-blockList');
        toastService.showToast('Blocked Contact Updated');

      }, function (err) {
        toastService.showToast(err.message);
      })

    }


    function search(blockedNumber, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].contactMobile || myArray[i].contactHome || myArray[i].contactWork || myArray[i].blockedNumber === blockedNumber) {
          if (myArray[i].blockedNumber) {
            myArray[i].contactFirstName = myArray[i].blockedName;
          }
          return myArray[i];
        }
      }
    }

    if ($rootScope.fromState == 'tab.personal-blockList') {
      searchedContact = search($stateParams.number, localStorageService.getData('blockedContacts'));
      $scope.blockedContactInfo = searchedContact;
      console.log($scope.blockedContactInfo);
      //$scope.blockedContactInfo.number = $stateParams.number;
    }
    else {
      $scope.blockedContactInfo = search($stateParams.number, localStorageService.getData('blockedContacts'));
    }


    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.deleteBlocked = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure?',
        okText: 'Delete',
        cssClass: 'stylingConfirmButton'
      });

      confirmPopup.then(function (res) {
        if (res) {
          blockedService.deleteBlocked($stateParams.number).then(function (response) {
            //localStorageUpdateService.deleteFromContacts($stateParams.id);
            console.log(response);
            if (response.status) {
              $rootScope.refreshHistory = true;
              $rootScope.fetchBlocked = true;
              toastService.showToast('Blocked Number Deleted');
              $state.go('tab.dash');

              function search(number, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                  if (myArray[i].blockedNumber === number) {
                    console.log(myArray[i]);
                    //myArray[i].contactLastName =
                    return myArray[i];
                  }
                }
              }

              var blockedItem = search($stateParams.number, localStorageService.getData('blockedContacts'));
              localStorageUpdateBlockedService.deleteFromBlocked(blockedItem._id);
            }
            else {
              console.log(response.message);
              toastService.showToast(response.message);
            }
          }, function (error) {
            toastService.showToast('Error Occured, Please try later');
          })
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    }

  })
