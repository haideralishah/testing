/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('DashCtrl', function ($scope, $state, $rootScope, historyService, localStorageService, voicemailService, $interval, toastService) {

    $rootScope.fromState = $state.current.name;

    $scope.data = {
      "items": []
    }

    console.log($scope.contentSize);

    $scope.homeScreenCounters = {contacts: 0, blocked: 0, strangers: 0};

    voicemailService.getNotificationCount().then(function (response) {
      console.log(response);
      $scope.notificationCount = response.message;
    }, function (err) {
      console.log(err)
    })
    $scope.doRefresh = function () {
      toastService.showToast("Refreshing Data");
      $rootScope.refreshHistory = true;
      fetchHistory();
      voicemailService.getNotificationCount().then(function (response) {
        console.log(response);
        $scope.notificationCount = response.message;
      }, function (err) {
        console.log(err)
      })
      console.log('Working')
    }

    var fetchHistory = function () {
      if ($rootScope.refreshHistory) {
        console.log($rootScope.refreshHistory);
        historyService.getHomeHistory().then(function (data) {
          localStorageService.setData("userCallsInfo", data.message);
          $rootScope.refreshHistory = false;
          getHistory(data.message);
        }, function (data) {
          console.log(data.authrization);
        })
      }
      else {
        var data = localStorageService.getData("userCallsInfo");
        getHistory(data);
      }
    };

    var getHistory = function (data) {
      $scope.data.items = [];
      $scope.homeScreenCounters.contacts = 0;
      $scope.homeScreenCounters.blocked = 0;
      $scope.homeScreenCounters.strangers = 0;
      console.log(data);

      if (data && data.length > 0 && data != "User has no history") {
        data.forEach(function (data, ind) {
          //console.log(data);
        //  if (moment(moment().startOf('day'), "DD/MM/YYYY HH:mm:ss").diff(moment(data.endTime, "YYYY-MM-DD HH:mm:ss")) < 0) {
          if(1){
            $scope.data.items[ind] = data;
            $scope.data.items[ind].moment = moment(data.endTime, "YYYY-MM-DD HH:mm:ss").subtract(data.endTime, "YYYY-MM-DD HH:mm:ss").calendar();
            moment("1454521239279", "x").format("YYYY-MM-DD HH:mm:ss")
            //$scope.data.items[ind].initiationTimeChanged = moment($scope.data.items[ind].initiationTime).calendar();
            $scope.data.items[ind].showDuration = moment(('0' + Math.floor($scope.data.items[ind].call_duration / 60)).slice(-2) + "" + ('0' + ($scope.data.items[ind].call_duration % 60)).slice(-2), "mmss").format('HH:mm:ss');
            //$scope.data.items[ind].showDuration = moment((moment.duration($scope.data.items[ind].call_duration, 'seconds'))._data).format("HH:mm:ss");
            $scope.data.items[ind].imgSrc = $scope.data.items[ind].userCallType == 'stranger' ? 'img/strangers-icon.png' : $scope.data.items[ind].call_direction == 'outbound' ? 'img/callOutNaturalL.png' : 'img/incoming-call.png';
            //$scope.data.items[ind].imgSrc = $scope.data.items[ind].userCallType == 'blocked' && $scope.data.items[ind].call_direction == 'outbound' ? 'img/blockedCall1-icon.png';
            if ($scope.data.items[ind].userCallType == 'blocked' && $scope.data.items[ind].call_direction == 'outbound') {
              $scope.data.items[ind].imgSrc = 'img/blockedCall1-icon.png'
            }
            if ($scope.data.items[ind].userCallType == 'blocked' && $scope.data.items[ind].call_direction == 'inbound') {
              $scope.data.items[ind].imgSrc = 'img/blockedCall-icon.png'
            }

            if (data.userCallType == 'contact') {
              $scope.homeScreenCounters.contacts++;
            } else if (data.userCallType == 'blocked') {
              $scope.homeScreenCounters.blocked++;
            } else if (data.userCallType == 'stranger') {
              $scope.homeScreenCounters.strangers++;
            }
          }
        })

      }

    }

    /*fetchHistory();*/

    $scope.goTo = function (state) {
      $rootScope.toggleEnable = true;
      $state.go('tab.history', {toggleState: state});
    }

    $scope.showDetail = function (item) {
      console.log(item);

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

    $scope.$on('$ionicView.enter', function () {
      // Any thing you can think of
      $scope.doRefresh();
    });

  })
