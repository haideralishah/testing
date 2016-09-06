/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.controllers')
  .controller('VoicemailHistoryCtrl', function (toastService, $timeout, $scope, $ionicScrollDelegate, $ionicHistory, $state, $stateParams, $rootScope, MediaManager, $ionicPopup, voicemailService, blockedService) {
    $scope.isActive = false;
    $scope.filter = false;
    $scope.showAllTextBold = false;
    $scope.showDiv = false;
    var itemCount = 0;
    var countStranger = 0;
    var countContact = 0;

    $scope.goTo = function () {
      $state.go('tab.dash');
    };

    $scope.btns = [{
      label: "All",
      state: "all",
      flag: false,
      icon: 'fa fa-phone'
    },
      {
        label: "Contacts",
        state: "contact",
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
    }

    $scope.rmFilter = function () {
      $scope.showAllTextBold = true;
      $scope.filter = false;

      $scope.btns.forEach(function (item) {
        console.log(item);
        item.flag = false;
      })
    }


    $scope.toggle = function (b) {
      //alert('b' + b)
      that = this;
      $scope.filter = true;
      $scope.showAllTextBold = false;
      $ionicScrollDelegate.scrollTop();

      //this.b.state = !this.b.state;
      $scope.btns.forEach(function (item) {
        //console.log(item);
        item.flag = false;
        if (b == item.state) {
          item.flag = true;
          $scope.data.filter = b;
          console.log(b);
          $scope.histStat = b;
          $scope.callName = b;
        }
      })
      $scope.btns.forEach(function (item) {
        console.log(item);
      })
    }

    if ($rootScope.fromState != 'tab.dash') {
      $scope.rmFilter();
    }
    else {
      $scope.toggle($stateParams["toggleState"]);
    }

    $scope.showDiv = false;
    $scope.hiddenDiv = {'item': null};
    $scope.btns[0].flag = true;
    $scope.data.filter = 'all';
    $scope.histStat = 'all';
    $scope.filter = true;
    $scope.callName = 'all';


    $scope.showDetail = function (item, index) {


      if ($scope.histStat == 'all') {
        if (index == itemCount - 1) {
          $ionicScrollDelegate.scrollBottom();
        }
      } else if ($scope.histStat == 'stranger') {
        if (index == countStranger - 1) {
          $ionicScrollDelegate.scrollBottom();
        }
      } else if ($scope.histStat == 'contact') {
        if (index == countContact - 1) {
          $ionicScrollDelegate.scrollBottom();
        }
      }

      $scope.showDiv = !$scope.showDiv;
      console.log(index);
      $scope.index = index;
      $scope.track =
      {
        url: item.recordUrl,
        artist: 'Genesis',
        title: 'Land of Confusion'
      }

      $scope.stopPlayback = function () {
        MediaManager.stop();
      };
      $scope.playTrack = function (index) {
        $scope.dynamicTrack = $scope.tracks[index];

        $scope.togglePlayback = !$scope.togglePlayback;
      }

      $scope.gotoAddcontacts = function () {
        $state.transitionTo('tab.add-contacts');
      }

      $scope.gotoAddblock = function () {
        $state.transitionTo('tab.add-blocked');
      }
    }

    $scope.dynamicTrack = {};
    var secToMin = 0;

    var getVoiceMailHistory = function () {
      voicemailService.getVoiceMailInfo().then(function (response) {
        console.log(response);
        $rootScope.notificationCount = 0;
        $scope.data.items = response.message;
        $scope.data.items.forEach(function (data, index) {
          itemCount++;
          if (data.userCallType == 'stranger') {
            countStranger++;
          }
          else if (data.userCallType == 'contact') {
            countContact++;
          }
          $scope.data.items[index].showDuration = moment($scope.data.items[index].record_duration / 1000, "s").format('HH:mm:ss');
          $scope.data.items[index].moment = moment.unix(data.endTime / 1000).fromNow();
          secToMin = moment(data.endTime, "x").format("YYYY-MM-DD HH:mm:ss");
          $scope.data.items[index].callTime = moment(secToMin, "YYYY-MM-DD HH:mm:ss").subtract(secToMin, "YYYY-MM-DD HH:mm:ss").calendar();
          $scope.data.items[index].icon = $scope.data.items[index].userCallType == 'contact' ? 'ion-ios-recording-outline' : 'img/strangers-icon.png';

        })
      }, function (err) {
        $scope.data.items = [];

        console.log(err)
      })
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

    $scope.scrollToTop = function () {

    }

    $scope.updateNotificationCount = function (id) {
      console.log(id);
      voicemailService.updateVoiceMailInfo(id)
        .then(function (response) {

          console.log(response);
        }, function (err) {
          console.log(err);
        })
    }


    $scope.deleteVoicemail = function (item) {
      console.log(item);
      var myPopup = $ionicPopup.show({
        //  template: '',
        title: 'Are you sure you want to delete?',
        //subTitle: 'Please use normal things',
        scope: $scope,
        cssClass: 'stylingPopupButton',
        buttons: [
          {text: 'Cancel', type: 'button-outline button-dark'},
          {
            text: 'Delete',
            type: 'button-assertive button-outline',
            onTap: function (e) {
              voicemailService.deleteVoiceMail(item._id)
                .then(function (response) {
                  if (response.status) {
                    getVoiceMailHistory();
                    $scope.showDiv = !$scope.showDiv;
                    toastService.showToast('Voicemail Deleted');
                  }
                  else {
                    //
                  }
                  console.log(response)
                }, function (err) {
                  console.log(err);
                  toastService.showToast(err.message);
                })
            }
          },
          {
            text: 'Delete + Add to block list',
            type: 'button-assertive button-outline',
            onTap: function (e) {
              blockedService.saveBlocked(item)
                .then(function (response) {
                  if (response.status) {
                    voicemailService.deleteVoiceMail(item._id)
                      .then(function (response) {
                        if (response.status) {
                          getVoiceMailHistory();
                          $scope.showDiv = !$scope.showDiv;
                          toastService.showToast('Voicemail deleted. Number added to blocklist.');
                          $rootScope.fetchBlocked = true; //For refreshing the Blocklist.
                        }
                        else {
                          //
                        }
                        console.log(response)
                      }, function (err) {
                        console.log(err)
                        toastService.showToast(err.message);
                      })
                    //toastService.showToast('Voicemail Added');
                  }
                  else {
                    //
                  }
                  console.log(response)
                }, function (err) {
                  console.log(err)
                  toastService.showToast(err.message);
                })
            }
          }
        ]
      });
      /*
       var confirmPopup = $ionicPopup.confirm({
       title: 'Are you sure?',
       okText: 'Delete'
       });

       confirmPopup.then(function (res) {
       if (res) {
       voicemailService.deleteVoiceMail(item._id)
       .then(function (response) {
       if (response.status) {
       getVoiceMailHistory();
       toastService.showToast('Voicemail Deleted');
       }
       else {
       //
       }
       console.log(response)
       }, function (err) {
       console.log(err)
       toastService.showToast(err.message);
       })
       console.log('You are sure');
       } else {
       console.log('You are not sure');
       }
       });

       */
    };
    getVoiceMailHistory();
  });



