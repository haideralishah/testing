/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('signUpCtrl', function ($scope, authService, $ionicPopup, $state, validation, $cordovaToast, toastService, $rootScope, $http) {

    $scope.user = {
      fullName: '',
      mobile: '',
      cargiverNumber: '',
      email: '',
      password: '',
      seniorCountryCode: "1",
      caregiverCountryCode: "1",
    }

    /*
     * Getting Country Codes Starts
     */
    $scope.countryCodes = [];

    $http.get("js/CountryCodes.json").then(function (data) {
      $scope.countryCodes = data.data;
    }, function (err) {
      console.error(err);
    });

    /*
     * Getting Country Codes Ends
     */

    $scope.signUp = function (user) {
      console.log(user);
      if (!user.fullName) {
        toastService.showToast('Full Name is required');
      }
      else if (!validation.validateName(user.fullName)) {
        toastService.showToast('Full Name should only be consist of Alphabets');
      }
      else if (!user.mobile) {
        toastService.showToast('Mobile number is required');
      }
      else if (!user.cgnumber) {
        toastService.showToast('Caregiver number is required');
      }
      else if (!validation.validateEmail(user.email)) {
        toastService.showToast('Please enter valid email');
      }
      else if (!user.password) {
        toastService.showToast('Password is required');
      }
      else if (user.password && user.password.length < 5) {
        toastService.showToast('Password must be at least 5 characters');
      }
      else if (!validation.validatePassword(user.password)) {
        toastService.showToast('Password must contain lowercase, uppercase, numeric and special character (!@#$&*)');
      }
      else if (!user.re_password.match(user.password) || !user.re_password) {
        toastService.showToast('Passwords do not match');
        console.log('password not match');
      }
      else {
        var data = {
          userFullName: user.fullName,
          //userMobile: $rootScope.ccodeMask(user.mobile),
          userMobile: user.seniorCountryCode + user.mobile,
          userEmail: user.email,
          userPassword: user.password,
          userStatus: true,
          //userCaregiverNumber: $rootScope.ccodeMask(user.cgnumber)
          userCaregiverNumber: user.caregiverCountryCode + user.cgnumber
        }
        console.log(data);
        authService.signUp(data).then(function (response) {
          if (response.status == true) {
            $state.go('signin');
          }
          else {
            toastService.showToast('User already exist');
            $state.go('signup');
          }
        }, function (error) {
          toastService.showToast(error.message);
        })
      }
    }

  })
