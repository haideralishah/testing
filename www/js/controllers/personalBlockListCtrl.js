/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')

  .controller('personalBlockListCtrl', function ($scope, $ionicHistory, $state, $rootScope, $ionicScrollDelegate, localStorageService, blockedService, toastService) {
    $rootScope.fromState = $state.current.name;
    //alert($state.current.name);
    console.log("abc");
    $scope.searchText = '';
    $scope.isActive = false;
    $scope.filter = false;
    $scope.showAllTextBold = true;
    $scope.callName = 'names';

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.btns = [{
      label: "Name",
      state: "names",
      flag: false,
      //icon: 'fa fa-phone'
    },
      {
        label: "Number",
        state: "numbers",
        flag: false
      }];

    $scope.btns[0].flag = true;

    $scope.toggle = function (b) {
      that = this;
      $scope.filter = true;
      $scope.showAllTextBold = false;
      $ionicScrollDelegate.scrollTop();

      //this.b.state = !this.b.state;
      $scope.btns.forEach(function (item) {
        item.flag = false;
        if (b == item.state) {
          item.flag = true;
          $scope.data.filter = b;
          console.log(b);
          $scope.histStat = b;
          $scope.callName = b;
          //alert($scope.callName);
        }
      })
      $scope.btns.forEach(function (item) {
        console.log(item);
      })
    }

    $scope.data = {
      "filter": 'names'
    }

    $scope.closeKeyboard = function (ev) {
      if (ev.keyCode == 13) {
        cordova.plugins.Keyboard.close();
        $scope.active = false;
      }
    }

    $scope.cancelSearch = function () {
      $scope.searchText = ''
      cordova.plugins.Keyboard.close();
    }

    $scope.clearSearch = function () {
      $scope.searchText = '';
    }

    $scope.activeSearchCross = function () {
      $scope.active = true;
    }

    var creatingDeviderData = function () {
      $scope.contactItems = []
      var array = localStorageService.getData('blockedContacts').sort($scope.compare);
      console.log(array);
      for (var i = 0; i < array.length; i++) {
        $scope.contactItems[i] = (array[i])
      }

      var prevElement = ['a1'];
      var currentElement = '';
      var exist = false;
      var count = 0;
      var count1 = 0;

      $scope.groups = [];

      for (var i = 0; i < $scope.contactItems.length; i++) {
        currentElement = $scope.contactItems[i].blockedName.substr(0, 1)
        var exist = false

        for (var j = 0; j <= prevElement.length; j++) {
          if (prevElement[j] == currentElement) {
            exist = true;
          }
        }
        if (!exist) {
          $scope.groups[count] = {
            name: currentElement.toLocaleUpperCase(),
            items: [],
            show: false
          };
          for (var k = 0; k < $scope.contactItems.length; k++) {
            if ($scope.contactItems[k].blockedName && $scope.contactItems[k].blockedName.substr(0, 1) == currentElement) {
              $scope.groups[count].items.push($scope.contactItems[k]);
              count1++;
            }
          }
          count++;
        }
        prevElement[i] = $scope.contactItems[i].blockedName.substr(0, 1);
      }
    }

    $scope.$on('$ionicView.enter', function () {
      if ($rootScope.fetchBlocked) {
        blockedService.getBlocked().then(function (response) {
          console.log(response);
          $scope.data.items = response.message;
          $rootScope.fetchBlocked = false;
          creatingDeviderData();
        }, function (err) {
          console.log(err);
          creatingDeviderData();
          toastService.showToast(err.message);
        })
      }
      else {
        $scope.data.items = localStorageService.getData("blockedContacts");
        creatingDeviderData();
      }
    })


  })
