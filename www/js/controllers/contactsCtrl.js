/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('contactsCtrl', function ($scope, $ionicScrollDelegate, $rootScope, $state, localStorageService, contactsService, stateData, toastService) {
    $rootScope.fromState = $state.current.name;
    $scope.filter = true;
    $scope.sortType = 'firstName'; // set the default sort type
    $scope.sortReverse = false;

    $scope.compare = function (a, b) {
      if (a.contactFirstName < b.contactFirstName)
        return -1;
      else if (a.contactFirstName > b.contactFirstName)
        return 1;
      else
        return 0;
    }

    var user = {
      userEmail: localStorageService.getData('userLoginData').userName
    }
    console.log(stateData);

    $scope.userContacts = localStorageService.getData('contacts').sort($scope.compare)
    console.log($scope.userContacts);

    $scope.btns = [{
      label: "All",
      state: "allContct",
      flag: false,
    }, {
      label: "Friends",
      state: "friends",
      flag: false,
    }, {
      label: "Blocked",
      state: "blocked",
      flag: false,
    }];

    $scope.data = {
      "filter": 'friends',
      "items": []
    }

    $scope.toggle = function (b) {
      that = this;
      $scope.filter = true;
      $ionicScrollDelegate.scrollTop();
      //this.b.state = !this.b.state;
      $scope.btns.forEach(function (item) {
        item.flag = false;
        if (b == item.state) {
          that.b.flag = true;
          $scope.data.filter = b;
          $scope.callName = b;
        }
      })

      $scope.btns.forEach(function (item) {
        console.log(item);
      })
    }

    $scope.rmFilter = function () {
      $scope.filter = false;
      $scope.btns.forEach(function (item) {
        console.log(item);
        item.flag = false;
      })
    }

    $scope.dividerFunction = function (key) {
      return key;
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

    $scope.contactItems = []
    var array = localStorageService.getData('contacts').sort($scope.compare);
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
      currentElement = $scope.contactItems[i].contactFirstName?$scope.contactItems[i].contactFirstName.substr(0, 1):"";
      var exist = false

      for (var j = 0; j <= prevElement.length; j++) {
        if (prevElement[j] == currentElement) {
          exist = true;
        }
      }
      if (!exist) {
        $scope.groups[count] = {
          name: currentElement,
          items: [],
          show: false
        };
        for (var k = 0; k < $scope.contactItems.length; k++) {
          if ($scope.contactItems[k].contactFirstName && $scope.contactItems[k].contactFirstName.substr(0, 1) == currentElement) {
            $scope.groups[count].items.push($scope.contactItems[k]);
            count1++;
          }
        }
        count++;
      }
      if($scope.contactItems[i].contactFirstName){
        prevElement[i] = $scope.contactItems[i].contactFirstName.substr(0, 1);
      }


    }


    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function (group) {
      group.show = !group.show;
    };
    $scope.isGroupShown = function (group) {
      return group.show;
    };

  })
