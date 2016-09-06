/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')

  .controller('profileCtrl', function ($scope,apiURL, $ionicHistory, $state, $rootScope, $timeout, $stateParams, localStorageUpdateService, localStorageService, contactsService, validation, toastService, $ionicPopup, imageService, $ionicLoading,$q,$http) {

    $rootScope.fromState = $state.current.name;
    $scope.enableEdit = false;
    var checkContact = false;
    $scope.enableEdit2 = false;
    console.log("abc");
    $scope.goBack = function () {
      console.log("test")
      $ionicHistory.goBack();
    }

    console.log($stateParams.id)

    $scope.setImage = function () {

      imageService.getPictures()
        .then(function (result) {
          $scope.contactInfo.contactImage = result;
          console.log($scope.URL);

        }, function (err) {
          console.log(err);
        })

    }

    $scope.cancelEditing = function () {
      $scope.enableEdit = false;
      $scope.enableEdit2 = false;
    }


    $scope.deleteContact = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure?',
        okText: 'Delete',
        cssClass: 'stylingConfirmButton'

      });

      confirmPopup.then(function (res) {
        if (res) {
          contactsService.deleteContact($scope.contactInfo._id).then(function (response) {
            localStorageUpdateService.deleteFromContacts($stateParams.id);
            console.log(response);
            if (response.status) {
              toastService.showToast('Contact Deleted');
              $rootScope.fetchContacts = true;
              $rootScope.refreshHistory = true;
              $state.go('tab.contacts');
            }
          }, function (error) {
            console.log(error);
          })
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    }

    function search(contactId, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i]._id == contactId || myArray[i].contactMobile == contactId || myArray[i].contactHome == contactId || myArray[i].contactWork == contactId) {
          console.log(myArray[i]);
          return myArray[i];
        }
      }
    }

    $scope.contactInfo = search($stateParams.id, localStorageService.getData('contacts'));
    if ($scope.contactInfo && $scope.contactInfo.contactImage) {
      $scope.contactInfo.contactImage = $scope.contactInfo.contactImage.substring(0, 48) + "/w_250,h_250,c_thumb" + $scope.contactInfo.contactImage.substring(48);
    }

    $scope.contactInfoCopy = angular.copy($scope.contactInfo);
    console.log($scope.contactInfo);

    $scope.editContacts = function () {
      $timeout(function () {
        $scope.enableEdit2 = true;
        $scope.enableEdit = true;
      }, 50);
    }

    $scope.saveContacts = function (contact) {
      contact._id = $scope.contactInfo._id;

      contact.contactMobile = $rootScope.ccodeMask(contact.contactMobile);
      contact.contactHome = $rootScope.ccodeMask(contact.contactHome);
      contact.contactWork = $rootScope.ccodeMask(contact.contactWork);

      console.log(contact);
      $scope.enableEdit = false;

      /*if (contact.contactFirstName == "" || !validation.validateName(contact.contactFirstName)) {
       $scope.contactInfo.contactFirstName = $scope.contactInfoCopy.contactFirstName;
       toastService.showToast('First Name should only be alphabets');
       }
       else if (!validation.validateName(contact.contactLastName)) {
       $scope.contactInfo.contactLastName = $scope.contactInfoCopy.contactLastName;
       toastService.showToast('Last Name should only be alphabets');
       }*/
      if (contact.contactFirstName == "") {
        $scope.contactInfo.contactFirstName = $scope.contactInfoCopy.contactFirstName;
        toastService.showToast('First Name is required.');
      } else if (!contact.contactMobile && !contact.contactHome && !contact.contactWork) {
        toastService.showToast('Please Enter Contact Number');
      }
      else {

        $q.all({
          contactMobile: $http.post(apiURL + '/isInBlocked', {
            "userEmail": contact.userEmail,
            "number": contact.contactMobile
          }),
          contactHome: $http.post(apiURL + '/isInBlocked', {
            "userEmail": contact.userEmail,
            "number": contact.contactHome
          }),
          contactWork: $http.post(apiURL + '/isInBlocked', {
            "userEmail": contact.userEmail,
            "number": contact.contactWork
          })
        }).then(function (results) {
          var saveRecord = true;
          var isBlockedPrompt = "";
          var isFoundResult = {
            contactMobile: results.contactMobile.data,
            contactHome: results.contactHome.data,
            contactWork: results.contactWork.data
          };
          for (k in isFoundResult) {
            if (isFoundResult[k].message && isFoundResult[k].message.isFound) {
              saveRecord = false;
              isBlockedPrompt = k;
            }
          }
          if (saveRecord) {
            console.log("Not Found In Blocked.");
            if (contact.contactImage.substring(0, 4) == 'file') {
              imageService.uploadImage(contact.contactImage)
                .then(function (result) {
                  console.log(result.url);
                  contact.contactImage = result.url;
                  contactsService.updateContact(contact).then(function (response) {
                    console.log(response);
                    if (response.status) {
                      toastService.showToast('Contact Updated');
                      $rootScope.fetchContacts = true;
                      $rootScope.refreshHistory = true;
                      $state.transitionTo('tab.contacts');
                    }
                  }, function (error) {
                    toastService.showToast(error.message);
                  })

                }, function (err) {
                  toastService.showToast('Error in image saving');
                })
            }
            else {
              contact.contactImage = contact.contactImage.substring(0, 48) + contact.contactImage.substring(48);
              contactsService.updateContact(contact).then(function (response) {
                console.log(response);
                if (response.status) {
                  toastService.showToast('Contact Updated');
                  $rootScope.fetchContacts = true;
                  $rootScope.refreshHistory = true;
                  $state.transitionTo('tab.contacts');
                }
              }, function (error) {
                toastService.showToast(error.message);
              })
            }
          } else {
            toastService.showToast(isBlockedPrompt.substr(7) + " number already exists in the Personal Block List.");
          }
          console.log("isFoundResult ", isFoundResult);
        }, function (err) {
          console.log(err.config.url);
        });
      }
    }

    $scope.callingRules = function () {
      var userOutGoingCall = localStorageService.getData("userInfo").userDisableOutgoingCalls;
      var result = false;
      if (userOutGoingCall) {
        $scope.globalcCallRules = userOutGoingCall;
        result = true;
      }
      return result;
    }

    $scope.callingRules();
  })
