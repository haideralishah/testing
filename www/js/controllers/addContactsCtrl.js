/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('addContactsCtrl', function ($scope, apiURL, $ionicHistory, $state, $stateParams, $rootScope, contactsService, localStorageService, validation, toastService, localStorageUpdateService, imageService, blockedService, $q, $http) {
    $rootScope.fromState = $state.current.name;
    var checkContact = false;
    $scope.contact = [];
    $scope.isActive = false;
    $scope.contact.image = '';

    var user = {
      userEmail: localStorageService.getData('userLoginData').userName
    }

    $scope.contact = {
      firstName: '',
      lastName: '',
      alias: '',
      mobile: '',
      home: '',
      work: '',
      relationship: 'Family',
      notifications: false,
      allowOutgoingCalls: true
    }

    if ($stateParams.number) {
      $scope.contact.mobile = $stateParams.number;
      $scope.isActive = true
    }

    $scope.goBack = function () {
      //$event.stopPropagation();
      console.log("test1")
      $ionicHistory.goBack();
    }

    $scope.setImage = function () {

      imageService.getPictures()
        .then(function (result) {
          $scope.contact.image = result;
          console.log($scope.URL);

        }, function (err) {
          console.log(err);
        })

    }

    $scope.addPhone = function () {
      console.log($scope.isActive)
      $scope.isActive = !$scope.isActive;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $scope.saveContacts = function (contact) {
      console.log(contact.relationship)
      $scope.contact.image = contact.image;

      var data = {
        "userEmail": user.userEmail,
        "contactFirstName": capitalizeFirstLetter(contact.firstName),
        "contactLastName": capitalizeFirstLetter(contact.lastName),
        "contactAlias": contact.alias,
        "contactRelationship": contact.relationship,
        "contactAddToquickDial": true,
        "contactAddToFriends": true,
        "contactNotifications": contact.notifications,
        "contactAllowOutgoingCalls": contact.allowOutgoingCalls,
        "contactMultiRingOutgoingCalls": true,
        "contactOverridingCallingRules": true,
        "contactAddedToBlockList": true,
        "contactMobile": contact.mobile ? $rootScope.ccodeMask(contact.mobile) : "",
        "contactHome": contact.home ? $rootScope.ccodeMask(contact.home) : "",
        "contactWork": contact.work ? $rootScope.ccodeMask(contact.work) : "",
        "contactImage": contact.image ? $rootScope.ccodeMask(contact.image) : ""
      }


      /*if (!validation.validateName(contact.firstName)) {
       toastService.showToast('First Name should only be alphabets');
       }
       else if (!validation.validateName(contact.lastName)) {
       toastService.showToast('Last Name should only be alphabets');
       }
       else */
      if (!contact.firstName && !contact.lastName) {
        toastService.showToast('Please Enter Name');
      }
      else if (!contact.mobile && !contact.home && !contact.work) {
        toastService.showToast('Please Enter Contact Number');
      }
      else {
        for (var i = 0; i < localStorageService.getData('contacts').length; i++) {
          if (localStorageService.getData('contacts')[i].contactMobile == data.contactMobile && data.contactMobile != '') {
            checkContact = true
            break;
          }
        }

        if (checkContact) {
          toastService.showToast('This Mobile number is already exist');
          checkContact = false
        } else {
          $q.all({
            contactMobile: $http.post(apiURL + '/isInBlocked', {
              "userEmail": data.userEmail,
              "number": data.contactMobile
            }),
            contactHome: $http.post(apiURL + '/isInBlocked', {"userEmail": data.userEmail, "number": data.contactHome}),
            contactWork: $http.post(apiURL + '/isInBlocked', {"userEmail": data.userEmail, "number": data.contactWork})
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
              if ($scope.contact.image) {
                imageService.uploadImage($scope.contact.image)
                  .then(function (result) {
                    console.log(result.url);
                    data.contactImage = result.url;
                    contactsService.saveContacts(data).then(function (response) {
                      console.log(response);
                      $rootScope.refreshHistory = true;
                      $rootScope.fetchContacts = true;
                      toastService.showToast('Contact Added');
                      $state.go('tab.contacts');
                    }, function (error) {
                      toastService.showToast(error.message);
                    })
                  }, function (err) {
                    toastService.showToast('Error in image saving');
                  })
              }
              else {
                contactsService.saveContacts(data).then(function (response) {
                  console.log(response);
                  $rootScope.fetchContacts = true;
                  $rootScope.refreshHistory = true;
                  toastService.showToast('Contact Added');
                  $state.go('tab.contacts');
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
        /*else {
         $scope.isAlreadyABlocked = {"userEmail": data.userEmail, "number": data.contactMobile};
         blockedService.isAlreadyBlocked($scope.isAlreadyABlocked).then(function (isAlreadyABlockedData) {
         if (isAlreadyABlockedData.message && isAlreadyABlockedData.message.isFound) {
         toastService.showToast("Mobile number is in Blocked list.");
         } else if (isAlreadyABlockedData.message && isAlreadyABlockedData.message.isFound == false) {
         if (data.contactHome) {
         $scope.isAlreadyABlocked = {"userEmail": data.userEmail, "number": data.contactHome};
         blockedService.isAlreadyBlocked($scope.isAlreadyABlocked).then(function (isAlreadyABlockedData) {
         if (isAlreadyABlockedData.message && isAlreadyABlockedData.message.isFound) {
         toastService.showToast("Home number is in Blocked list.");
         } else if (isAlreadyABlockedData.message && isAlreadyABlockedData.message.isFound == false) {
         if (data.contactWork) {
         $scope.isAlreadyABlocked = {"userEmail": data.userEmail, "number": data.contactWork};
         blockedService.isAlreadyBlocked($scope.isAlreadyABlocked).then(function (isAlreadyABlockedData) {
         if (isAlreadyABlockedData.message && isAlreadyABlockedData.message.isFound) {
         toastService.showToast("Work number is in Blocked list.");
         } else if (isAlreadyABlockedData.message && isAlreadyABlockedData.message.isFound == false) {
         if ($scope.contact.image) {
         imageService.uploadImage($scope.contact.image)
         .then(function (result) {
         console.log(result.url);
         data.contactImage = result.url;
         contactsService.saveContacts(data).then(function (response) {
         console.log(response);
         $rootScope.refreshHistory = true;
         $rootScope.fetchContacts = true;
         toastService.showToast('Contact Added');
         $state.go('tab.contacts');
         }, function (error) {
         toastService.showToast(error.message);
         })
         }, function (err) {
         toastService.showToast('Error in image saving');
         })
         }
         else {
         contactsService.saveContacts(data).then(function (response) {
         console.log(response);
         $rootScope.fetchContacts = true;
         $rootScope.refreshHistory = true;
         toastService.showToast('Contact Added');
         $state.go('tab.contacts');
         }, function (error) {
         toastService.showToast(error.message);
         })
         }
         }
         }, function (error) {
         toastService.showToast(error.message);
         })
         } else {
         if ($scope.contact.image) {
         imageService.uploadImage($scope.contact.image)
         .then(function (result) {
         console.log(result.url);
         data.contactImage = result.url;
         contactsService.saveContacts(data).then(function (response) {
         console.log(response);
         $rootScope.refreshHistory = true;
         $rootScope.fetchContacts = true;
         toastService.showToast('Contact Added');
         $state.go('tab.contacts');
         }, function (error) {
         toastService.showToast(error.message);
         })
         }, function (err) {
         toastService.showToast('Error in image saving');
         })
         }
         else {
         contactsService.saveContacts(data).then(function (response) {
         console.log(response);
         $rootScope.fetchContacts = true;
         $rootScope.refreshHistory = true;
         toastService.showToast('Contact Added');
         $state.go('tab.contacts');
         }, function (error) {
         toastService.showToast(error.message);
         })
         }
         }
         }
         }, function (error) {
         toastService.showToast(error.message);
         })
         } else if (data.contactWork) {
         $scope.isAlreadyABlocked = {"userEmail": data.userEmail, "number": data.contactWork};
         blockedService.isAlreadyBlocked($scope.isAlreadyABlocked).then(function (isAlreadyABlockedData) {
         if (isAlreadyABlockedData.message && isAlreadyABlockedData.message.isFound) {
         toastService.showToast("Work number is in Blocked list.");
         } else if (isAlreadyABlockedData.message && isAlreadyABlockedData.message.isFound == false) {
         if ($scope.contact.image) {
         imageService.uploadImage($scope.contact.image)
         .then(function (result) {
         console.log(result.url);
         data.contactImage = result.url;
         contactsService.saveContacts(data).then(function (response) {
         console.log(response);
         $rootScope.refreshHistory = true;
         $rootScope.fetchContacts = true;
         toastService.showToast('Contact Added');
         $state.go('tab.contacts');
         }, function (error) {
         toastService.showToast(error.message);
         })
         }, function (err) {
         toastService.showToast('Error in image saving');
         })
         }
         else {
         contactsService.saveContacts(data).then(function (response) {
         console.log(response);
         $rootScope.fetchContacts = true;
         $rootScope.refreshHistory = true;
         toastService.showToast('Contact Added');
         $state.go('tab.contacts');
         }, function (error) {
         toastService.showToast(error.message);
         })
         }
         }
         }, function (error) {
         toastService.showToast(error.message);
         })
         }else{
         if ($scope.contact.image) {
         imageService.uploadImage($scope.contact.image)
         .then(function (result) {
         console.log(result.url);
         data.contactImage = result.url;
         contactsService.saveContacts(data).then(function (response) {
         console.log(response);
         $rootScope.refreshHistory = true;
         $rootScope.fetchContacts = true;
         toastService.showToast('Contact Added');
         $state.go('tab.contacts');
         }, function (error) {
         toastService.showToast(error.message);
         })
         }, function (err) {
         toastService.showToast('Error in image saving');
         })
         }
         else {
         contactsService.saveContacts(data).then(function (response) {
         console.log(response);
         $rootScope.fetchContacts = true;
         $rootScope.refreshHistory = true;
         toastService.showToast('Contact Added');
         $state.go('tab.contacts');
         }, function (error) {
         toastService.showToast(error.message);
         })
         }
         }
         /!**!/
         }
         }, function (error) {
         toastService.showToast(error.message);
         })
         }*/
      }
    }
  })

