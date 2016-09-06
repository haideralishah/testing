/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('changePasswordCtrl', function ($scope, $state, pushNotificationService, voicemailService, $rootScope, authService, $ionicPopup, validation, toastService, localStorageService, contactsService, blockedService) {

    $scope.isVerify = false;

    $scope.user = {
      email: '',
      password: ''

    };

    /* Change Password Function */
    $scope.changePassword = function (data) {
      console.log(data);
      authService.changePassword(data).then(function (response) {
        $scope.isVerify = true;
        if (response) {
          toastService.showToast('Your password has been changed. Please login to continue');
          $state.go('signin');
        }
      }, function (err) {
        toastService.showToast("Error Ocuured. Please try again later.");
      })
    };

    /* This Function will verify the email address in our
     database and on success will send reset code to email.*/
    $scope.verify = function (user) {
      var data = {
        userEmail: user.userEmail,
      };
      if (validation.validateEmail(user.userEmail)) {
        authService.verifyEmail(data).then(function (response) {
          $scope.user.userEmail = response.message.userEmail;
          toastService.showToast('Your reset code is sent to your email.');
          $scope.isVerify = true;                                                          //For Updating the UI
        }, function (err) {
          toastService.showToast("Error Ocuured. Please try again later.");
        })
      }
      else {
        toastService.showToast('Please enter valid email.');
      }
    }


  })
