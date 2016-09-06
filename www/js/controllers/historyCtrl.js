/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('historyCtrl', function (historyService, $scope, $ionicScrollDelegate, $ionicHistory, $stateParams, $rootScope, $state, localStorageService) {

    $scope.isActive = false;
    $scope.filter = false;
    $scope.showAllTextBold = true;
    $scope.enableClick = false;

    var currentOffset = 0;
    $scope.CallsRecords = [];
    $scope.moreDataCanBeLoadedStatus = true;

    $scope.tab = '';


    /* infinate Schrol function for refreshing data with offset  start*/
    $scope.doRefresh = function () {
      console.log(true);
      currentOffset = currentOffset + 30;
      historyService.getHistoryWithOffset(currentOffset).then(function (data) {
        if (data.status) {
          if (data.message && data.message.length) {
            data.message.forEach(function (datas, index) {
              $scope.CallsRecords[0].push(datas);
            });
            $scope.moreDataCanBeLoadedStatus = data.status;
            $scope.data.items = $scope.CallsRecords[0];
            localStorageService.setData("userCallsInfo", $scope.data.items);

            $scope.$broadcast('scroll.infiniteScrollComplete');


            getUserInfoIcons();

          }
        }
        else {
          $scope.moreDataCanBeLoadedStatus = data.status;
          // $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

      });
      /*
       $scope.$on('$stateChangeSuccess', function () {
       $scope.doRefresh();
       });*/

    }

    var getUserCallsInfo_offset = function () {
      historyService.getHistoryWithOffset(0).then(function (data) {
        localStorageService.setData("userCallsInfo", data.message);
        $scope.CallsRecords.push(data.message);
        console.log($scope.CallsRecords);
        // $scope.data.items = $scope.CallsRecords[0].message;
        $scope.data.items = $scope.CallsRecords[0];

        getUserInfoIcons();
      })
    };
    getUserCallsInfo_offset();
    /* infinate Schrol function for refreshing data with offset  end */


    /* function for get Icons information  start*/
    var getUserInfoIcons = function () {
      if ($scope.data.items.indexOf("User has no history") == -1) {
        $scope.data.items.forEach(function (data, ind) {
          $scope.data.items[ind].moment = moment(data.endTime, "YYYY-MM-DD HH:mm:ss").subtract(data.endTime, "YYYY-MM-DD HH:mm:ss").calendar();
          $scope.data.items[ind].showGray = moment().diff(moment(data.endTime, "YYYY-MM-DD HH:mm:ss"), 'days') > 0 ? true : false;// moment(data.endTime, "YYYY-MM-DD HH:mm:ss").subtract(data.endTime, "YYYY-MM-DD HH:mm:ss").calendar();
          //$scope.data.items[ind].initiationTimeChanged = moment($scope.data.items[ind].initiationTime).calendar();
          $scope.data.items[ind].showDuration = moment($scope.data.items[ind].call_duration, "s").format('HH:mm:ss');
          //$scope.data.items[ind].showDuration = moment((moment.duration(Number($scope.data.items[ind].call_duration), 'seconds'))._data).format("HH:mm:ss");
          $scope.data.items[ind].imgSrc = $scope.data.items[ind].userCallType == 'stranger' ? 'img/strangers-icon.png' : $scope.data.items[ind].call_direction == 'outbound' ? 'img/callOutNaturalL.png' : 'img/incoming-call.png';
          if ($scope.data.items[ind].userCallType == 'blocked' && $scope.data.items[ind].call_direction == 'outbound') {
            $scope.data.items[ind].imgSrc = 'img/blockedCall1-icon.png'
          }
          if ($scope.data.items[ind].userCallType == 'blocked' && $scope.data.items[ind].call_direction == 'inbound') {
            $scope.data.items[ind].imgSrc = 'img/blockedCall-icon.png'
          }
        })

      }

    };
    /* function for get Icons information  end */


    console.log($state);

    console.log($stateParams.toggleState);

    $scope.showDetail = function (item) {
      if ($scope.enableClick) {
        if (item.userCallType == 'stranger') {
          $state.go('tab.strangerNumber-detail', {'id': item._id});
        }
        if (item.userCallType == 'contact') {
          if (item.call_direction == 'outbound') {
            $state.go('tab.profile', {'id': item.toCaller});
          }
          else if (item.call_direction == 'inbound') {
            $state.go('tab.profile', {'id': item.fromCaller});
          }
        }
        if (item.userCallType == 'blocked') {
          if (item.call_direction == 'outbound') {
            $state.go('tab.blockedNumber-detail', {'number': item.toCaller, 'name': item.contactFirstName});
          }
          else if (item.call_direction == 'inbound') {
            $state.go('tab.blockedNumber-detail', {'number': item.fromCaller, 'name': item.contactFirstName});
          }
        }
      }
    }

    $scope.btns = [{
      label: "Contacts",
      state: "contact",
      flag: false,
      icon: 'fa fa-phone'
    },
      {
        label: "Blocked",
        state: "blocked",
        flag: false,
        icon: 'fa fa-ban'
      }, {
        label: "Strangers",
        state: "stranger",
        flag: false,
        icon: "fa fa-user-secret"
      }];

    $scope.data = {
      "filter": 'contacts'
    };

    // $scope.data.items = localStorageService.getData('userCallsInfo');


    $scope.rmFilter = function () {
      $scope.showAllTextBold = true;
      $scope.filter = false;

      $scope.btns.forEach(function (item) {
        console.log(item);
        item.flag = false;
      })
    }

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
          $scope.tab = b;

          $scope.histStat = b;
          $scope.callName = b;
        }
      })
      $scope.btns.forEach(function (item) {
        console.log(item);
      })
    }

    if ($rootScope.fromState != 'tab.dash') {
      $rootScope.fromState = $state.current.name;
      $scope.rmFilter();
    }
    else if ($rootScope.fromState == 'tab.dash' && $rootScope.toggleEnable == true) {
      $rootScope.fromState = $state.current.name;
      $rootScope.toggleEnable = false;
      $scope.toggle($stateParams["toggleState"]);
      $rootScope.fromState = $state.current.name;
    }
    else {
      $scope.rmFilter();
    }

    $scope.gotoAddcontacts = function () {
      $state.transitionTo('tab.add-contacts');
    }

    $scope.gotoAddblock = function () {
      $state.transitionTo('tab.add-blocked');
    }

    $scope.closeKeyboard = function (ev) {
      if (ev.keyCode == 13) {
        cordova.plugins.Keyboard.close();
        $scope.active = false;
      }
    }

    $scope.cancelSearch = function () {
      cordova.plugins.Keyboard.close();
      $scope.searchText = ''
    }

    $scope.clearSearch = function () {
      $scope.searchText = '';
    }

    $scope.activeSearchCross = function () {
      $scope.active = true;
    }

    $scope.$on('$ionicView.enter', function () {
      $scope.enableClick = true; //Disabling click before the view is loaded completely
    })

  })
