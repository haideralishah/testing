/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('settingsCtrl', function ($rootScope, pushNotificationService, $state, $scope, localStorageService, plivoSettingsStatusService, toastService, authService) {


    $rootScope.fromState = $state.current.name;
    console.log($rootScope.fromState);

    $scope.goTo = function () {
      $state.transitionTo('tab.personal-blockList');
    };
    $scope.userPlivoRulesSettings = {checked: true};
    $scope.userOutgoingCallsSettings = {checked: true};
    plivoSettingsStatusService.getPlivoRulesStatus().then(function (data) {
      $scope.userPlivoRulesSettings.checked = data.message.userPlivoRules == "false" ? checked = false : checked = true;
    });

    $scope.setPlivoRulesStatus = function () {
      data = {
        "userPlivoRules": $scope.userPlivoRulesSettings.checked
      };
      plivoSettingsStatusService.setPlivoRulesStatus(data).then(function (response) {
        console.log('response' + JSON.stringify(response));
        if (response.status) {
          toastService.showToast('Rules Saved');
        }
      }, function (error) {
        toastService.showToast(error.message);
      })
    };

    $scope.logoutUser = function () {
      authService.logout().then(function (res) {
        $state.transitionTo('signin');
        toastService.showToast('Please Signin to continue');
        localStorageService.setData('userCallsInfo', []);
        localStorageService.setData('contacts', []);
        localStorageService.setData('userLoginData', null);
        localStorageService.setData('blockedContacts', []);
        localStorageService.setData('userVoicemails', []);
        localStorageService.setData('userInfo', []);
      }, function (error) {
        toastService.showToast(error.message);
      })
    };

    $scope.allowOutgoingCalls = function () {
      var data = {
        userDisableOutgoingCalls: true
      };
      if ($scope.userOutgoingCallsSettings.checked) {
        data.userDisableOutgoingCalls = true;
        console.log(data);
        authService.updateUserOutgoingCalls(data).then(function (response) {
          console.log('response' + JSON.stringify(response));
          if (response.status) {
            console.log('expected', response.data.message);
            localStorageService.setData('userInfo', response.data.message);

            toastService.showToast('Outgoing calls to allowed contacts only');
            $rootScope.fetchUserInfo = true;
          }
        }, function (error) {
          toastService.showToast(error.message);
        })
      }
      else {
        data.userDisableOutgoingCalls = false;
        console.log(data);
        authService.updateUserOutgoingCalls(data).then(function (response) {
          console.log('response' + JSON.stringify(response));
          if (response.status) {
            toastService.showToast('Outgoing calls are unrestricted');
            localStorageService.setData('userInfo', response.data.message);
            $rootScope.fetchUserInfo = true;
          }
        }, function (error) {
          toastService.showToast(error.message);
        })
      }
    }

    if ($rootScope.fetchUserInfo) {
      authService.getUserInfo().then(function (response) {
        console.log(response);
        if (response.status) {
          $scope.userOutgoingCallsSettings.checked = response.message.userDisableOutgoingCalls == false ? checked = false : checked = true;
          $rootScope.fetchUserInfo = false;
          localStorageService.setData('userInfo', response.message);
          $scope.userData = response.message;
        }
      }, function (error) {
        toastService.showToast(error.message);
      })
    }
    else {
      $scope.userData = localStorageService.getData('userInfo');
      $scope.userOutgoingCallsSettings.checked = $scope.userData.userDisableOutgoingCalls == false ? checked = false : checked = true;
    }
  })
