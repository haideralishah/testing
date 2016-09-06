/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('SignInCtrl', function ($scope, $state, pushNotificationService, voicemailService, $rootScope, authService, $ionicPopup, validation, toastService, localStorageService, contactsService, blockedService) {

    $rootScope.fromState = $state.current.name;

    $scope.user = {
      email: '',
      password: '',

    }

    $scope.signIn = function (user) {
      var data = {
        userEmail: user.email,
        userPassword: user.password
      }

      if (validation.validateEmail(user.email)) {
        authService.logIn(data).then(function (data) {
          //$rootScope.fetchContacts = true;
          $state.go('tab.dash');
          if (!$rootScope.fetchContacts) {
            $rootScope.fetchContacts = true;
          }
          if (!$rootScope.refreshHistory) {
            $rootScope.refreshHistory = true;
          }


          var user = {
            userEmail: localStorageService.getData('userLoginData').userName
          }

          authService.getUserInfo().then(function (response) {
            localStorageService.setData('userInfo', response.message);
            // localStorageService.setData('userLoginData')
          }, function (response) {
            console.log(response);
          })

          contactsService.getContacts(user).then(function (response) {
            localStorageService.setData('contacts', response.message)
            $rootScope.fetchContacts = false;
          }, function (err) {
            console.log(err);
            toastService.showToast(err);
          })

          blockedService.getBlocked().then(function (response) {
            console.log(response);
            localStorageService.setData('blockedContacts', response.message)
            $scope.data.items = response.message;
            $rootScope.fetchBlocked = false;
          }, function (err) {
            console.log(err);
            toastService.showToast(err);
          })

          console.log(data)
        }, function (error) {
          /* $ionicPopup.alert({
           title: 'Error',
           cssClass: 'activeBackground',
           template: error.message
           });*/
          toastService.showToast(error.message);
        })
      }
      else {
        /*$ionicPopup.alert({
         title: 'Invalid Email',
         cssClass: 'activeBackground',
         template: 'Please Enter Valid Email'
         });*/
        toastService.showToast('Please enter valid email');
      }

    }

  })
