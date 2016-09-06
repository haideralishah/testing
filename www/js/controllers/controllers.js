angular.module('starter.controllers', []);

/*Commented All Sections and replace in Controllers Different File*/


  /*.controller('SignInCtrl', function ($scope, $state, pushNotificationService, voicemailService, $rootScope, authService, $ionicPopup, validation, toastService, localStorageService, contactsService, blockedService) {

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
          /!* $ionicPopup.alert({
           title: 'Error',
           cssClass: 'activeBackground',
           template: error.message
           });*!/
          toastService.showToast(error.message);
        })
      }
      else {
        /!*$ionicPopup.alert({
         title: 'Invalid Email',
         cssClass: 'activeBackground',
         template: 'Please Enter Valid Email'
         });*!/
        toastService.showToast('Please enter valid email');
      }

    }

  })*/

 /* .controller('changePasswordCtrl', function ($scope, $state, pushNotificationService, voicemailService, $rootScope, authService, $ionicPopup, validation, toastService, localStorageService, contactsService, blockedService) {

    $scope.isVerify = false;

    $scope.user = {
      email: '',
      password: ''

    };

    /!* Change Password Function *!/
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

    /!* This Function will verify the email address in our
     database and on success will send reset code to email.*!/
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


  })*/

  /*.controller('signUpCtrl', function ($scope, authService, $ionicPopup, $state, validation, $cordovaToast, toastService, $rootScope, $http) {

    $scope.user = {
      fullName: '',
      mobile: '',
      cargiverNumber: '',
      email: '',
      password: '',
      seniorCountryCode: "1",
      caregiverCountryCode: "1",
    }

    /!*
     * Getting Country Codes Starts
     *!/
    $scope.countryCodes = [];

    $http.get("js/CountryCodes.json").then(function (data) {
      $scope.countryCodes = data.data;
    }, function (err) {
      console.error(err);
    });

    /!*
     * Getting Country Codes Ends
     *!/

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

  })*/

 /* .controller('DashCtrl', function ($scope, $state, $rootScope, historyService, localStorageService, voicemailService, $interval, toastService) {

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
          if (moment(moment().startOf('day'), "DD/MM/YYYY HH:mm:ss").diff(moment(data.endTime, "YYYY-MM-DD HH:mm:ss")) < 0) {
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

    /!*fetchHistory();*!/

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

  })*/

  /*.controller('homeCtrl', function ($scope, $window, $rootScope, $state) {
    $rootScope.fromState = $state.current.name;
    $scope.swiper = {};
    var count = 0;
    $scope.dev_height = $window.innerHeight + "px";

    $scope.onReadySwiper = function (swiper) {
      swiper.on('slideChangeStart', function () {
        console.log('slide start');
      });

      swiper.on('onSlideChangeEnd', function () {
        console.log('slide end');
      });
    };

    $scope.signin = function () {
      $state.go('signin');
    }
  })*/

  /*.controller('historyCtrl', function (historyService, $scope, $ionicScrollDelegate, $ionicHistory, $stateParams, $rootScope, $state, localStorageService) {

    $scope.isActive = false;
    $scope.filter = false;
    $scope.showAllTextBold = true;
    $scope.enableClick = false;

    var currentOffset = 0;
    $scope.CallsRecords = [];
    $scope.moreDataCanBeLoadedStatus = true;

    $scope.tab = '';


    /!* infinate Schrol function for refreshing data with offset  start*!/
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
      /!*
       $scope.$on('$stateChangeSuccess', function () {
       $scope.doRefresh();
       });*!/

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
    /!* infinate Schrol function for refreshing data with offset  end *!/


    /!* function for get Icons information  start*!/
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
    /!* function for get Icons information  end *!/


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

  })*/

/*  .controller('contactsCtrl', function ($scope, $ionicScrollDelegate, $rootScope, $state, localStorageService, contactsService, stateData, toastService) {
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
      currentElement = $scope.contactItems[i].contactFirstName.substr(0, 1)
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
          if ($scope.contactItems[k].contactFirstName.substr(0, 1) == currentElement) {
            $scope.groups[count].items.push($scope.contactItems[k]);
            count1++;
          }
        }
        count++;
      }
      prevElement[i] = $scope.contactItems[i].contactFirstName.substr(0, 1);


    }


    /!*
     * if given group is the selected group, deselect it
     * else, select the given group
     *!/
    $scope.toggleGroup = function (group) {
      group.show = !group.show;
    };
    $scope.isGroupShown = function (group) {
      return group.show;
    };

  })*/

 /* .controller('quietHoursCtrl', function ($scope, $ionicHistory, $rootScope, $state, quietHoursService, localStorageService, validation, toastService) {

    $rootScope.fromState = $state.current.name;
    $scope.userQHStatus = {};
    $scope.userQHStatus.status = false;
    var user = {
      userEmail: localStorageService.getData('userLoginData').userName
    }

    $scope.goBack = function () {
      console.log("test")
      $state.transitionTo('tab.settings');
    }

    /!* For Restricting Slider if userQHStatus is not set*!/
    $scope.restrictSlider = function () {
      $scope.slider.options.disabled = $scope.userQHStatus.status == true ? false : true;
    }

    /!* Getting Quite Hours for user *!/
    quietHoursService.getQuietHours(user).then(function (response) {
      console.log('res' + JSON.stringify(response));
      if (response.status == true) {
        $scope.slider.minValue = response.message.startTime > 12 ? response.message.startTime - 18 : response.message.startTime;
        $scope.slider.maxValue = response.message.endTime > 12 ? response.message.endTime - 6 : response.message.endTime + 6;
      } else {
        $scope.slider.minValue = 5;
        $scope.slider.maxValue = 11;
      }
      $scope.userQHStatus.status = response.message.userQHStatus == "true" ? true : false;
      $scope.slider.options.disabled = $scope.userQHStatus.status == true ? false : true;
    }, function (error) {
      toastService.showToast('Error loading Quiet Hours');
    })

    /!* Setting/updating Quite Hours for user *!/
    $scope.setQH = function (data) {
      data = {
        "userEmail": user.userEmail,
        "startTime": data.minValue < 6 ? data.minValue + 18 : data.minValue - 6,
        "endTime": data.maxValue < 6 ? data.maxValue + 18 : data.maxValue - 6,
        "userQHStatus": $scope.userQHStatus.status == true ? "true" : "false"
      }
      quietHoursService.setQuietHours(data).then(function (response) {
        if (response.status) {
          toastService.showToast('Quiet Hours Saved');
        }
      }, function (error) {
        toastService.showToast(error.message);
      })
    }


    $scope.slider = {
      minValue: 0,
      maxValue: 18,
      step: 1,
      options: {
        floor: 0,
        ceil: 18,
        noSwitching: true,
        translate: function (value) {
          return '$' + value;
        }
      }
    }


  })*/

 /* .controller('addContactsCtrl', function ($scope, apiURL, $ionicHistory, $state, $stateParams, $rootScope, contactsService, localStorageService, validation, toastService, localStorageUpdateService, imageService, blockedService, $q, $http) {
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


      /!*if (!validation.validateName(contact.firstName)) {
       toastService.showToast('First Name should only be alphabets');
       }
       else if (!validation.validateName(contact.lastName)) {
       toastService.showToast('Last Name should only be alphabets');
       }
       else *!/
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
        /!*else {
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
         }*!/
      }
    }
  })

  .controller('profileCtrl', function ($scope,apiURL, $ionicHistory, $state, $rootScope, $timeout, $stateParams, localStorageUpdateService, localStorageService, contactsService, validation, toastService, $ionicPopup, imageService, $ionicLoading,$q,$http) {

    $rootScope.fromState = $state.current.name;
    $scope.enableEdit = false;
    var checkContact = false;
    $scope.enableEdit2 = false;
    console.log("abc");
    $scope.goBack = function () {
      console.log("test")
      $ionicHistory.goBack();
    }

    console.log($stateParams.id)

    $scope.setImage = function () {

      imageService.getPictures()
        .then(function (result) {
          $scope.contactInfo.contactImage = result;
          console.log($scope.URL);

        }, function (err) {
          console.log(err);
        })

    }

    $scope.cancelEditing = function () {
      $scope.enableEdit = false;
      $scope.enableEdit2 = false;
    }


    $scope.deleteContact = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure?',
        okText: 'Delete'
      });

      confirmPopup.then(function (res) {
        if (res) {
          contactsService.deleteContact($scope.contactInfo._id).then(function (response) {
            localStorageUpdateService.deleteFromContacts($stateParams.id);
            console.log(response);
            if (response.status) {
              toastService.showToast('Contact Deleted');
              $rootScope.fetchContacts = true;
              $rootScope.refreshHistory = true;
              $state.go('tab.contacts');
            }
          }, function (error) {
            console.log(error);
          })
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    }

    function search(contactId, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i]._id == contactId || myArray[i].contactMobile == contactId || myArray[i].contactHome == contactId || myArray[i].contactWork == contactId) {
          console.log(myArray[i]);
          return myArray[i];
        }
      }
    }

    $scope.contactInfo = search($stateParams.id, localStorageService.getData('contacts'));
    if ($scope.contactInfo && $scope.contactInfo.contactImage) {
      $scope.contactInfo.contactImage = $scope.contactInfo.contactImage.substring(0, 48) + "/w_250,h_250,c_thumb" + $scope.contactInfo.contactImage.substring(48);
    }

    $scope.contactInfoCopy = angular.copy($scope.contactInfo);
    console.log($scope.contactInfo);

    $scope.editContacts = function () {
      $timeout(function () {
        $scope.enableEdit2 = true;
        $scope.enableEdit = true;
      }, 50);
    }

    $scope.saveContacts = function (contact) {
      contact._id = $scope.contactInfo._id;

      contact.contactMobile = $rootScope.ccodeMask(contact.contactMobile);
      contact.contactHome = $rootScope.ccodeMask(contact.contactHome);
      contact.contactWork = $rootScope.ccodeMask(contact.contactWork);

      console.log(contact);
      $scope.enableEdit = false;

      /!*if (contact.contactFirstName == "" || !validation.validateName(contact.contactFirstName)) {
       $scope.contactInfo.contactFirstName = $scope.contactInfoCopy.contactFirstName;
       toastService.showToast('First Name should only be alphabets');
       }
       else if (!validation.validateName(contact.contactLastName)) {
       $scope.contactInfo.contactLastName = $scope.contactInfoCopy.contactLastName;
       toastService.showToast('Last Name should only be alphabets');
       }*!/
      if (contact.contactFirstName == "") {
        $scope.contactInfo.contactFirstName = $scope.contactInfoCopy.contactFirstName;
        toastService.showToast('First Name is required.');
      } else if (!contact.contactMobile && !contact.contactHome && !contact.contactWork) {
        toastService.showToast('Please Enter Contact Number');
      }
      else {

        $q.all({
          contactMobile: $http.post(apiURL + '/isInBlocked', {
            "userEmail": contact.userEmail,
            "number": contact.contactMobile
          }),
          contactHome: $http.post(apiURL + '/isInBlocked', {
            "userEmail": contact.userEmail,
            "number": contact.contactHome
          }),
          contactWork: $http.post(apiURL + '/isInBlocked', {
            "userEmail": contact.userEmail,
            "number": contact.contactWork
          })
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
            if (contact.contactImage.substring(0, 4) == 'file') {
              imageService.uploadImage(contact.contactImage)
                .then(function (result) {
                  console.log(result.url);
                  contact.contactImage = result.url;
                  contactsService.updateContact(contact).then(function (response) {
                    console.log(response);
                    if (response.status) {
                      toastService.showToast('Contact Updated');
                      $rootScope.fetchContacts = true;
                      $rootScope.refreshHistory = true;
                      $state.transitionTo('tab.contacts');
                    }
                  }, function (error) {
                    toastService.showToast(error.message);
                  })

                }, function (err) {
                  toastService.showToast('Error in image saving');
                })
            }
            else {
              contact.contactImage = contact.contactImage.substring(0, 48) + contact.contactImage.substring(48);
              contactsService.updateContact(contact).then(function (response) {
                console.log(response);
                if (response.status) {
                  toastService.showToast('Contact Updated');
                  $rootScope.fetchContacts = true;
                  $rootScope.refreshHistory = true;
                  $state.transitionTo('tab.contacts');
                }
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
    }

    $scope.callingRules = function () {
      var userOutGoingCall = localStorageService.getData("userInfo").userDisableOutgoingCalls;
      var result = false;
      if (userOutGoingCall) {
        $scope.globalcCallRules = userOutGoingCall;
        result = true;
      }
      return result;
    }

    $scope.callingRules();
  })*/

  /*.controller('settingsCtrl', function ($rootScope, pushNotificationService, $state, $scope, localStorageService, plivoSettingsStatusService, toastService, authService) {


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
  })*/

  /*.controller('addBlockedCtrl', function ($scope, $ionicHistory, $state, $rootScope, localStorageService, blockedService, toastService, contactsService) {
    $rootScope.fromState = $state.current.name;
    $scope.block = {
      blockedName: '',
      blockedNumber: ''
    }

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }


      $scope.saveBlockedContact = function (data) {

        data.blockedNumber = $rootScope.ccodeMask(data.blockedNumber);

        data.userEmail = localStorageService.getData('userLoginData').userName;
        blockedService.saveBlocked(data).then(function (response) {
          console.log(response);
          $rootScope.refreshHistory = true;
          $rootScope.fetchBlocked = true;
          $state.go('tab.personal-blockList');
          toastService.showToast('Blocked Contact Added');
        }, function (err) {
          console.log(err)
          toastService.showToast(err.message);
        })
      }

    /!*$scope.saveBlockedContact = function (data) {

      data.blockedNumber = $rootScope.ccodeMask(data.blockedNumber);
      data.userEmail = localStorageService.getData('userLoginData').userName;
      $scope.isAlreadyContact = {"userEmail": data.userEmail, "number": $scope.block.blockedNumber};
      contactsService.isAlreadyAContact($scope.isAlreadyContact).then(function (isAlreadyAContactData) {
        if (isAlreadyAContactData.message && isAlreadyAContactData.message.isFound) {
          toastService.showToast("Phone number "+$scope.block.blockedNumber +" already exists in [contact name] Contact.");
        } else if (isAlreadyAContactData.message && isAlreadyAContactData.message.isFound == false) {
          blockedService.saveBlocked(data).then(function (response) {
            console.log(response);
            $rootScope.refreshHistory = true;
            $rootScope.fetchBlocked = true;
            $state.go('tab.personal-blockList');
            toastService.showToast('Blocked Contact Added');
          }, function (err) {
            console.log(err)
            toastService.showToast(err.message);
          })
        }
      }, function (err) {
        console.error(err);
      })
    }*!/
  })*/

  /*.controller('personalBlockListCtrl', function ($scope, $ionicHistory, $state, $rootScope, $ionicScrollDelegate, localStorageService, blockedService, toastService) {
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


  })*/

 /* .controller('blockedNumberDetailCtrl', function ($rootScope, $state, $scope, $timeout, $ionicHistory, $stateParams, localStorageService, $ionicPopup, blockedService, toastService, localStorageUpdateBlockedService) {
    console.log($rootScope.fromState);
    console.log($stateParams.number);
    var searchedContact = '';


    $scope.editContacts = function () {
      $timeout(function () {
        $scope.enableEdit2 = true;
        $scope.enableEdit = true;
      }, 50);
    }

    $scope.cancelEditing = function () {
      $scope.enableEdit = false;
      $scope.enableEdit2 = false;
    }

    $scope.saveBlockedContact = function (data) {
      blockedService.updateBlocked(data).then(function (data) {
        $rootScope.refreshHistory = true;
        $rootScope.fetchBlocked = true;
        $state.go('tab.personal-blockList');
        toastService.showToast('Blocked Contact Updated');

      }, function (err) {
        toastService.showToast(err.message);
      })

    }


    function search(blockedNumber, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].contactMobile || myArray[i].contactHome || myArray[i].contactWork || myArray[i].blockedNumber === blockedNumber) {
          if (myArray[i].blockedNumber) {
            myArray[i].contactFirstName = myArray[i].blockedName;
          }
          return myArray[i];
        }
      }
    }

    if ($rootScope.fromState == 'tab.personal-blockList') {
      searchedContact = search($stateParams.number, localStorageService.getData('blockedContacts'));
      $scope.blockedContactInfo = searchedContact;
      console.log($scope.blockedContactInfo);
      //$scope.blockedContactInfo.number = $stateParams.number;
    }
    else {
      $scope.blockedContactInfo = search($stateParams.number, localStorageService.getData('blockedContacts'));
    }


    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

    $scope.deleteBlocked = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure?',
        okText: 'Delete',
        cssClass: 'stylingConfirmButton'
      });

      confirmPopup.then(function (res) {
        if (res) {
          blockedService.deleteBlocked($stateParams.number).then(function (response) {
            //localStorageUpdateService.deleteFromContacts($stateParams.id);
            console.log(response);
            if (response.status) {
              $rootScope.refreshHistory = true;
              $rootScope.fetchBlocked = true;
              toastService.showToast('Blocked Number Deleted');
              $state.go('tab.dash');

              function search(number, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                  if (myArray[i].blockedNumber === number) {
                    console.log(myArray[i]);
                    //myArray[i].contactLastName =
                    return myArray[i];
                  }
                }
              }

              var blockedItem = search($stateParams.number, localStorageService.getData('blockedContacts'));
              localStorageUpdateBlockedService.deleteFromBlocked(blockedItem._id);
            }
            else {
              console.log(response.message);
              toastService.showToast(response.message);
            }
          }, function (error) {
            toastService.showToast('Error Occured, Please try later');
          })
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    }

  })*/

  /*.controller('strangerNumberDetailCtrl', function ($rootScope, $state, $scope, $stateParams, localStorageService, strangerService, toastService, localStorageUpdateBlockedService) {
    console.log($stateParams.id);
    $scope.strangerInfo = {};

    function search(strangerId, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i]._id === strangerId) {
          console.log(myArray[i]);
          return myArray[i];
        }
      }
    }

    $scope.strangerInfo = search($stateParams.id, localStorageService.getData('userCallsInfo'));
    console.log($scope.strangerInfo);
    if ($scope.strangerInfo.call_direction == 'outbound') {
      $scope.strangerInfo.number = $scope.strangerInfo.toCaller
    }
    else if ($scope.strangerInfo.call_direction == 'inbound') {
      $scope.strangerInfo.number = $scope.strangerInfo.fromCaller
    }
    console.log($scope.strangerInfo)

    $scope.goBack = function () {
      if ($rootScope.fromState == 'tab.dash') {
        $state.transitionTo('tab.dash');
      }

      if ($rootScope.fromState == 'tab.history') {
        $state.transitionTo('tab.history');
      }
    }

    $scope.goTo = function () {
      $state.go('tab.add-contacts', {'number': $scope.strangerInfo.number});
    }

    $scope.moveStranger = function (strangerInfo) {
      strangerService.moveStranger(strangerInfo).then(function (response) {
        console.log(response);
        if (response.status == true) {
          $rootScope.refreshHistory = true;
          $rootScope.fetchBlocked = true;
          toastService.showToast('Stranger moved to Blocklist');
          $state.go('tab.dash');
          localStorageUpdateBlockedService.addToBlocked(response.message)

        }
        else {
          toastService.showToast('Error Occured, Please try later');
        }

      }, function (error) {
        console.log(error)
        toastService.showToast(error.message);
      })
    }

  })*/

 /* .controller('contactNumberDetailCtrl', function ($rootScope, $state, $scope, $ionicHistory, $stateParams, localStorageService) {
    console.log($rootScope.fromState);


    function search(contactId, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i]._id === contactId) {
          console.log(myArray[i])
          return myArray[i];
        }
      }
    }

    $scope.contactInfo = search($stateParams.id, localStorageService.getData('userCallsInfo'));

    console.log($scope.contactInfo);

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }

  })*/

  /*.controller('VoicemailCtrl', function ($scope, MediaManager) {
    var urlprefix = '/android_asset/www/audio/';

    $scope.dynamicTrack = {};

    $scope.tracks = [
      {
        url: 'https://s3.amazonaws.com/recordings_2013/17d26bda-060f-11e6-a16a-842b2b4be7e2.mp3',
        artist: 'Genesis',
        title: 'Land of Confusion'
      }

    ];

    $scope.stopPlayback = function () {
      MediaManager.stop();
    };
    $scope.playTrack = function (index) {
      $scope.dynamicTrack = $scope.tracks[index];

      $scope.togglePlayback = !$scope.togglePlayback;
    }
  })*/
  /*.controller('customVoiceMessagesCtrl', function($http,$scope, soundPickerService, $cordovaMedia , MediaManager , soundService) {
   var fileUrl = '';
   $scope.showDiv = false
   $scope.showQuietHoursDiv = false;
   $scope.showStrangerDiv = false;
   $scope.showContactDiv = false;
   $scope.showVoiceMailDiv = true;

   var data = {
   voiceMail: soundService.fileUrl,
   voiceContacts: soundService.fileUrl,
   voiceStranger: soundService.fileUrl,
   voiceQuiteHours: soundService.fileUrl
   };

   //soundService.saveVoiceMessages(data).then(
   //  function (success) {
   //    console.log("sendingtoserver", success);
   //  },
   //  function (err) {
   //    console.log(err);
   //  });

   /!*    $scope.showDetail = function (item, index) {

   if (index == 'quietHoursItem') {
   $scope.showQuietHoursDiv = !$scope.showQuietHoursDiv;
   }
   if (index == 'strangerItem') {
   $scope.showStrangerDiv = !$scope.showStrangerDiv;
   }
   };*!/
   //  if(index == 'contactItem'){
   //    $scope.showContactDiv = !$scope.showContactDiv  ;
   //  }
   //  if(index == 'voiceMailItem'){
   //  //  $scope.showVoiceMailDiv = !$scope.showVoiceMailDiv  ;
   //  }
   ////  $scope.index = 0;
   //  /!*$scope.track =
   //  {
   //    url: item.recordUrl,
   //    artist: 'Genesis',
   //    title: 'Land of Confusion'
   //  }
   //
   //  $scope.stopPlayback = function () {
   //    MediaManager.stop();
   //  };
   //  $scope.playTrack = function (index) {
   //    $scope.dynamicTrack = $scope.tracks[index];
   //
   //    $scope.togglePlayback = !$scope.togglePlayback;
   //  }
   //
   //  $scope.gotoAddcontacts = function () {
   //    $state.transitionTo('tab.add-contacts');
   //  }
   //
   //  $scope.gotoAddblock = function () {
   //    $state.transitionTo('tab.add-blocked');
   //  }*!/
   //}
   //
   //
   //
   //
   //$scope.stopPlayback = function () {
   //  MediaManager.stop();
   //};
   //
   //
   //
   //$scope.update = function() {
   //  $scope.tracks =
   //  {
   //    url:  soundService.fileUrl,
   //    artist: 'Genesis',
   //    title: 'Land of Confusion'
   //
   //  }
   //}
   //
   //
   //var vm = this;
   //
   //
   //
   //
   //

   $scope.showLine = soundPickerService.getDuration() ;
   $scope.Duration = soundPickerService.getDuration();

   $scope.captureAudio = function () {
   soundService.getSound().then(function (data) {
   soundService.uploadSound(data)
   .then(function (success) {
   soundPickerService.setSound(success.url);
   //  soundService.fileUrl = success.url ;
   console.log('data about uploading',success.url);
   }, function (error) {
   console.log(error);
   })
   }, function (error) {
   console.log(error);
   })
   };
   $scope.soundToPlay = soundPickerService.getSound();
   $scope.playSound = function () {
   var my_media = new Media(soundPickerService.getSound(),
   // success callback
   function () {

   console.log("playAudio():Audio Success", $scope.soundToPlay);
   /!*


   var mediaTimer = setInterval(function () {
   // get media position
   my_media.getCurrentPosition(
   // success callback
   function (position) {
   if (position > -1) {
   console.log((position) + " sec");
   clearInterval(mediaTimer);
   }
   console.log(position);
   },
   // error callback
   function (e) {
   console.log("Error getting pos=" + e);
   }
   );
   }, 1000);
   *!/


   /!* console.log( my_media.getDuration() );

   soundPickerService.setDuration(Math.floor( my_media.getDuration() ) );

   console.log('duration',soundPickerService.getDuration());

   var c = soundPickerService.getDuration();

   var duration = 0;

   var durationTimOut =  setInterval(function(){
   if(c >= duration) {
   duration++;
   soundPickerService.setDuration(duration);
   $scope.showLine = soundPickerService.getDuration();
   console.log(soundPickerService.getDuration());
   }
   else{
   clearInterval(durationTimOut);
   }
   console.log('running');
   },1000);*!/


   },
   // error callback
   function (err) {
   console.log("playAudio():Audio Error: ", err, $scope.soundToPlay);
   }
   );

   // Play audio
   my_media.play();

   // Update media position every second
   var mediaTimer = setInterval(function () {
   // get media position
   my_media.getCurrentPosition(
   // success callback
   function (position) {
   if (position > -1) {

   var d = Math.floor( position );
   soundPickerService.setDuration(d);
   $scope.showLine = soundPickerService.getDuration() ;
   $scope.Duration = soundPickerService.getDuration();
   }
   else{
   clearInterval(mediaTimer);
   }
   },
   // error callback
   function (e) {
   console.log("Error getting pos=" + e);
   }
   );
   }, 1000);
   };
   // Update media position every second
   })*/
  /*.controller('customVoiceMessagesCtrl', function (toastService, $http, $scope, soundPickerService, $cordovaMedia, MediaManager, soundService, customMessageService, $state, $interval) {

    /!* Initial Durations *!/
    $scope.cmDurations = {

      durationType: '',
      cmStrangersTotalDuration: 0,
      cmQuiteHourTotalDuration: 0,
      cmContactTotalDuration: 0,
      cmVoiceTotalDuration: 0,
      cmQuiteHourDuration: 0,
      cmStrangersDuration: 0,
      cmContactDuration: 0,
      cmVoiceDuration: 0
    };

    /!*For collapsing Items in view *!/
    $scope.QuitHoureCollapseStatus = false;
    $scope.ContactsCollapseStatus = false;
    $scope.StrangersCollapseStatus = false;
    $scope.VoicemailCollapseStatus = false;

    $scope.QuiteHouretoggleCollapse = function () {
      $scope.QuitHoureCollapseStatus = !$scope.QuitHoureCollapseStatus;
    }
    $scope.ContactstoggleCollapse = function () {
      $scope.ContactsCollapseStatus = !$scope.ContactsCollapseStatus;
    }
    $scope.StrangerstoggleCollapse = function () {
      $scope.StrangersCollapseStatus = !$scope.StrangersCollapseStatus;
    }

    $scope.VoicemailtoggleCollapse = function () {
      $scope.VoicemailCollapseStatus = !$scope.VoicemailCollapseStatus;
    };
    /!*For collapsing Items in view End *!/

    $scope.disablePlayButton = false;

    $scope.quitDurationShow = true;
    $scope.strangerDurationShow = true;
    $scope.contactDurationShow = true;
    $scope.voiceDurationShow = true;

    $scope.goBack = function () {
      $state.go('tab-settings');
    };

    $scope.saveVoiceMessage = function () {
      var data = {
        quitehours: soundPickerService.getSound("quite").url,
        voicequitehoursduration: soundPickerService.getSound("quite").duration,
        voiceStranger: soundPickerService.getSound("stranger").url,
        voiceStrangerDuration: soundPickerService.getSound("stranger").duration,
        voiceContacts: soundPickerService.getSound("contact").url,
        voiceContactsDuration: soundPickerService.getSound("contact").duration,
        voiceMail: soundPickerService.getSound("voice").url,
        voiceMailDuration: soundPickerService.getSound("voice").duration
      };
      customMessageService.postCustomMessageInfo(data)
        .then(function (success) {
          console.log(success);
          toastService.showToast('Custom Message Saved');
        }, function (err) {
          console.log(err);
        });
    };

    $scope.goBack = function () {
      console.log("test");
      $state.transitionTo('tab.settings');
    };

    customMessageService.getCustomMessageInfo().then(function (success) {
      if (success.default) {
        toastService.showToast('You have default voice messages.');
      }
      soundPickerService.setSound(success.message[0].voiceContacts, success.message[0].voiceContactsDuration, "contact");
      soundPickerService.setSound(success.message[0].voiceMail, success.message[0].voiceMailDuration, "voice");
      soundPickerService.setSound(success.message[0].voiceQuiteHours, success.message[0].voiceQuiteHoursDuration, "quite");
      soundPickerService.setSound(success.message[0].voiceStranger, success.message[0].voiceStrangerDuration, "stranger");
      $scope.cmDurations.cmQuiteHourDuration = Math.ceil(success.message[0].voiceQuiteHoursDuration);
      $scope.cmDurations.cmStrangersDuration = Math.ceil(success.message[0].voiceStrangerDuration);
      $scope.cmDurations.cmContactDuration = Math.ceil(success.message[0].voiceContactsDuration);
      $scope.cmDurations.cmVoiceDuration = Math.ceil(success.message[0].voiceMailDuration);
      //console.log(success.messages[0])
      console.log(success);
    }, function (fail) {
      console.log(fail);
    });

    $scope.$PauseQuit =false;
    $scope.$PauseContact = false;
    $scope.$PauseStranger = false;
    $scope.$PauseVoice = false;

    $scope.playCustomMessage = function (type) {

      $scope.QuithHourplayStatus = false;
      $scope.ContactplayStatus = false;
      $scope.StrangerplayStatus = false;
      $scope.VoiceplayStatus = false;

      var soundToPlay;

      if ($scope.disablePlayButton == false) {

        $scope.disablePlayButton = true;


        if (type == "quite") {

          $scope.$PauseQuit = true;
          $scope.quitDurationShow = true;

          soundToPlay = soundPickerService.getSound("quite");
          $scope.cmDurations.cmQuiteHourDuration = 0;
          $scope.cmDurations.durationType = 'quite';
          $scope.cmDurations.cmQuiteHourTotalDuration = soundToPlay.duration;

          var my_media = new Media(soundToPlay.url,
            function () {
              $scope.disablePlayButton = false;
              $scope.$PauseQuit = $scope.disablePlayButton;
              console.log("playAudio():Audio Success");
            },
            // error callback
            function (err) {
              console.log("playAudio():Audio Error: ", err);
            }
          );
          my_media.play();

          var timesRun = 0;
          $scope.cmDurations.cmQuiteHourTotalDuration = Math.ceil(soundToPlay.duration);
          var reseter = Math.ceil($scope.cmDurations.cmQuiteHourTotalDuration);
          var interval = $interval(function () {

            timesRun += 1;

            if (!$scope.QuitHoureCollapseStatus) {

              $scope.cmDurations.cmQuiteHourDuration = 0;
              $scope.$PauseQuit = false;
              $scope.disablePlayButton = false;
              soundToPlay = soundPickerService.getSound("quite");
              $scope.cmQuiteHourDuration = Math.ceil(soundToPlay.duration);
              $scope.quitDurationShow = false;
              my_media.stop();
              $interval.cancel(interval);

            }
            else if (timesRun <= reseter) {

              $scope.cmDurations.cmQuiteHourDuration += 1;
              QuitHoureDuration = $scope.cmDurations.cmQuiteHourDuration;

            }
            else {

              $scope.cmDurations.cmQuiteHourDuration = 0;
              $scope.$PauseQuit = false;
              $interval.cancel(interval);
              $scope.disablePlayButton = false;
              $scope.cmQuiteHourDuration = QuitHoureDuration;
              $scope.quitDurationShow = false;

            }
          }, 1000);

        } else if (type == "stranger") {

          $scope.$PauseStranger = true;
          $scope.strangerDurationShow = true;
          $scope.cmDurations.durationType = 'stranger';
          soundToPlay = soundPickerService.getSound("stranger");
          $scope.cmDurations.cmStrangersTotalDuration = soundToPlay.duration;
          $scope.cmDurations.cmStrangersDuration = 0;

          var my_media = new Media(soundToPlay.url,
            function () {
              $scope.disablePlayButton = false;
              $scope.$PauseStranger = $scope.disablePlayButton;
              console.log("playAudio():Audio Success");
            },
            // error callback
            function (err) {
              console.log("playAudio():Audio Error: ", err);
            }
          );
          my_media.play();
          var timesRun = 0;
          $scope.cmDurations.cmStrangersTotalDuration = Math.ceil(soundToPlay.duration);
          var reseter = Math.ceil($scope.cmDurations.cmStrangersTotalDuration);
          var interval = $interval(function () {

            timesRun += 1;

            if (!$scope.StrangersCollapseStatus) {
              $scope.cmDurations.cmStrangersDuration = 0;
              $scope.$PauseStranger = false;
              $scope.disablePlayButton = false;
              soundToPlay = soundPickerService.getSound("stranger");
              $scope.cmStrangersDuration = Math.ceil(soundToPlay.duration);
              $scope.strangerDurationShow = false;
              my_media.stop();
              $interval.cancel(interval);

            }
            else if (timesRun <= reseter) {
              $scope.cmDurations.cmStrangersDuration += 1;
              strangerMailDuration = $scope.cmDurations.cmStrangersDuration;
            }
            else {
              $scope.cmDurations.cmStrangersDuration = 0;
              $interval.cancel(interval);
              $scope.$PauseStranger = false;
              $scope.cmStrangersDuration = strangerMailDuration;
              $scope.strangerDurationShow = false;
              $scope.disablePlayButton = false;


            }
          }, 1000);

        } else if (type == "contact") {

          $scope.$PauseContact = true;
          $scope.contactDurationShow = true;
          soundToPlay = soundPickerService.getSound("contact");
          $scope.cmDurations.durationType = 'contact';
          $scope.cmDurations.cmContactTotalDuration = soundToPlay.duration;
          $scope.cmDurations.cmContactDuration = 0;

          var my_media = new Media(soundToPlay.url,
            function () {
              $scope.disablePlayButton = false;
              $scope.$PauseContact = $scope.disablePlayButton;
              console.log("playAudio():Audio Success");
            },
            function (err) {
              console.log("playAudio():Audio Error: ", err);
            }
          );

          my_media.play();

          var timesRun = 0;

          $scope.cmDurations.cmContactTotalDuration = Math.ceil(soundToPlay.duration);

          var reseter = Math.ceil($scope.cmDurations.cmContactTotalDuration);
          var interval = $interval(function () {
            timesRun += 1;

            if (!$scope.ContactsCollapseStatus) {

              $scope.cmDurations.cmContactDuration = 0;
              $scope.$PauseContact = false;
              $scope.disablePlayButton = false;
              soundToPlay = soundPickerService.getSound("stranger");
              $scope.cmContactDuration = Math.ceil(soundToPlay.duration);
              $scope.contactDurationShow = false;
              my_media.stop();
              $interval.cancel(interval);

            }
            else if (timesRun <= reseter) {
              $scope.cmDurations.cmContactDuration += 1;
              // $scope.$PauseContact = true;
              cmContactDuration = $scope.cmDurations.cmContactDuration;
            }
            else {

              $scope.contactDurationShow = false;
              $scope.cmDurations.cmContactDuration = 0;
              $scope.cmContactDuration = cmContactDuration;
              $interval.cancel(interval);
              $scope.$PauseContact = false;
              $scope.contactDurationShow = false;
              $scope.disablePlayButton = false;

            }
          }, 1000);

        } else if (type == "voice") {

          $scope.$PauseVoice = true;
          $scope.voiceDurationShow = true;
          soundToPlay = soundPickerService.getSound("voice");
          $scope.cmDurations.durationType = 'voice';
          $scope.cmDurations.cmVoiceTotalDuration = soundToPlay.duration;
          $scope.cmDurations.cmVoiceDuration = 0;


          var my_media = new Media(soundToPlay.url,
            function () {
              $scope.disablePlayButton = false;

              $scope.$PauseVoice = $scope.disablePlayButton;

              console.log("playAudio():Audio Success");
            },
            // error callback
            function (err) {
              console.log("playAudio():Audio Error: ", err);
            }
          );
          my_media.play();
          var timesRun = 0;
          var voiceMailDuration;
          $scope.cmDurations.cmVoiceTotalDuration = Math.ceil(soundToPlay.duration);
          var reseter = Math.ceil($scope.cmDurations.cmVoiceTotalDuration);
          var interval = $interval(function () {
            timesRun += 1;

            if (!$scope.VoicemailCollapseStatus) {

              $scope.cmDurations.cmVoiceDuration = 0;
              $scope.$PauseVoice = false;
              $scope.disablePlayButton = false;
              soundToPlay = soundPickerService.getSound("voice");
              $scope.cmVoiceDuration = Math.ceil(soundToPlay.duration);
              $scope.voiceDurationShow = false;
              my_media.stop();
              $interval.cancel(interval);

            }
            else if (timesRun <= reseter) {
              $scope.cmDurations.cmVoiceDuration += 1;
              //    $scope.$PauseVoice = true;
              voiceMailDuration = $scope.cmDurations.cmVoiceDuration;
            }
            else {

              $scope.cmDurations.cmVoiceDuration = 0;
              $scope.cmVoiceDuration = voiceMailDuration;
              $scope.voiceDurationShow = false;
              $interval.cancel(interval);
              $scope.$PauseVoice = false;
              $scope.disablePlayButton = false;
            }
          }, 1000);
        }
      }
    };

    $scope.editCustomMessage = function (type) {
      soundService.getSound().then(function (data) {
        soundService.uploadSound(data)
          .then(function (success) {
            if (type == "quite") {


              soundPickerService.setSound(success.url, success.duration, "quite");
              $scope.cmDurations.cmQuiteHourDuration = Math.ceil(success.duration);


              soundToPlay = soundPickerService.getSound("quite");
              $scope.cmDurations.cmQuiteHourDuration = 0;
              $scope.cmDurations.cmQuiteHourTotalDuration = Math.ceil(success.duration);
              $scope.quitDurationShow = false;
              $scope.cmQuiteHourDuration = Math.ceil($scope.cmDurations.cmQuiteHourTotalDuration);


            } else if (type == "stranger") {


              soundPickerService.setSound(success.url, success.duration, "stranger");
              $scope.cmDurations.cmStrangersDuration = Math.ceil(success.duration);


              soundToPlay = soundPickerService.getSound("stranger");
              $scope.cmDurations.cmStrangersTotalDuration = Math.ceil(success.duration);
              $scope.cmDurations.cmStrangersDuration = 0;

              $scope.cmStrangersDuration = Math.ceil($scope.cmDurations.cmStrangersTotalDuration);

              $scope.strangerDurationShow = false;

            } else if (type == "contact") {


              soundPickerService.setSound(success.url, success.duration, "contact");
              $scope.cmDurations.cmContactDuration = Math.ceil(success.duration);

              soundToPlay = soundPickerService.getSound("contact");
              $scope.cmDurations.cmContactTotalDuration = soundToPlay.duration;
              $scope.cmDurations.cmContactDuration = 0;

              $scope.cmContactDuration = Math.ceil($scope.cmDurations.cmContactTotalDuration);
              $scope.contactDurationShow = false;

            } else if (type == "voice") {

              soundPickerService.setSound(success.url, success.duration, "voice");
              $scope.cmDurations.cmVoiceDuration = Math.ceil(success.duration);

              soundToPlay = soundPickerService.getSound("voice");
              $scope.cmDurations.cmVoiceTotalDuration = soundToPlay.duration;
              $scope.cmDurations.cmVoiceDuration = 0;

              $scope.cmVoiceDuration = Math.ceil($scope.cmDurations.cmVoiceTotalDuration);

              $scope.voiceDurationShow = false;
            }
            console.log("for parsing data" + success);
            console.log('data about uploading', success.url);
          }, function (error) {
            console.log(error);
          })
      }, function (error) {
        console.log(error);
      })
    };
  })*/

  /*  .controller('customVoiceMessagesCtrl', function($http,$scope, soundPickerService, $cordovaMedia , MediaManager , soundService ,customMessageService) {

   $scope.quiteHoursCMDuration = 0;
   $scope.quiteHoursCMTotalDuration = 0;
   $scope.ConatactCMDuration = 0;
   $scope.ContactCMTotalDuration = 0;
   $scope.VoiceCMDuration = 0;
   $scope.VoiceCMTotalDuration = 0;


   /!* ----- QuitHoure Start ---- *!/
   customMessageService.getCustomMessageInfo().then(function(success){

   soundPickerService.setSound(success.message[0].voiceContacts,success.message[0].voiceContactsDuration,"contact");
   soundPickerService.setSound(success.message[0].voiceMail,success.message[0].voiceMailDuration,"voice");
   soundPickerService.setSound(success.message[0].voiceQuiteHours,success.message[0].voiceQuiteHoursDuration,"quite");
   soundPickerService.setSound(success.message[0].voiceStrange,success.message[0].giBa,"stranger");
   //console.log(success.messages[0])
   console.log(success);
   },function(fail){
   console.log(fail);
   });


   $scope.saveVoiceMessage =function(){
   var data = {
   quitehours  : soundPickerService.getSound("quite").url ,  voicequitehoursduration  : soundPickerService.getSound("quite").duration ,
   voiceStranger  : soundPickerService.getSound("stranger").url ,  voiceStrangerDuration  : soundPickerService.getSound("stranger").duration,
   voiceContacts  : soundPickerService.getSound("contact").url ,  voiceContactsDuration  : soundPickerService.getSound("contact").duration,
   voiceMail  : soundPickerService.getSound("voice").url ,  voiceMailDuration  : soundPickerService.getSound("voice").duration
   };
   customMessageService.postCustomMessageInfo(data)
   .then(function (success) {
   console.log(success);
   },function(err){
   console.log(err);
   });
   };
   $scope.editQuiteHoursCM = function(){
   soundService.getSound().then(function (data) {
   soundService.uploadSound(data)
   .then(function (success) {
   soundPickerService.setSound(success.url, success.duration, "quite");
   console.log("for parsing data"+success);
   console.log('data about uploading', success.url);
   }, function (error) {
   console.log(error);
   })
   }, function (error) {
   console.log(error);
   })
   };
   $scope.playQuiteHoursCM = function(){
   var soundToPlay = soundPickerService.getSound("quite");
   var my_media = new Media(soundToPlay.url,
   function () {
   console.log("playAudio():Audio Success");
   },
   // error callback
   function (err) {
   console.log("playAudio():Audio Error: " + err);
   }
   );
   my_media.play();
   console.log("Duration");
   console.log(soundToPlay.duration);
   $scope.quiteHoursCMTotalDuration = soundToPlay.duration;
   $scope.quiteHoursCMDuration = 0;
   var timesRun = 0;
   var interval = setInterval(function(){
   timesRun += 1;
   if(timesRun >= $scope.quiteHoursCMTotalDuration){
   $scope.$apply(function () {
   $scope.quiteHoursCMTotalDuration = 0;
   });
   clearInterval(interval);
   }
   $scope.$apply(function () {
   $scope.quiteHoursCMDuration += 1;
   });
   //do whatever here..
   }, 1000);
   };

   /!*----- QuiteHour End -------*!/


   /!*----- Contact Start ----- *!/

   $scope.editContactCM = function(){
   soundService.getSound().then(function (data) {
   soundService.uploadSound(data)
   .then(function (success) {
   soundPickerService.setSound(success.url,success.duration , "contact"  );
   log('data about uploading',success.url);
   }, function (error) {
   console.log(error);
   })
   }, function (error) {
   console.log(error);
   })
   };

   $scope.playContactCM = function(){
   var soundToPlay = soundPickerService.getSound("contact");
   var my_media = new Media(soundToPlay.url,
   function () {
   console.log("playAudio():Audio Success");
   },
   // error callback
   function (err) {
   console.log("playAudio():Audio Error: " + err);
   }
   );
   my_media.play();
   console.log("Contact Duration");
   console.log(soundToPlay.duration);
   $scope.ContactCMTotalDuration = soundToPlay.duration;
   $scope.ContactCMDuration = 0;
   var timesRun = 0;
   var interval = setInterval(function(){
   timesRun += 1;
   if(timesRun >= $scope.ContactCMTotalDuration){
   $scope.$apply(function () {
   $scope.ContactCMTotalDuration = 0;
   });
   clearInterval(interval);
   }
   $scope.$apply(function () {
   $scope.ContactCMDuration += 1;
   });
   //do whatever here..
   }, 1000);
   };
   /!*----- Conatact end ----- *!/

   /!*----- Stranger Start ----- *!/

   $scope.editStrangerCM = function(){
   soundService.getSound().then(function (data) {
   soundService.uploadSound(data)
   .then(function (success) {
   soundPickerService.setSound(success.url,success.duration , "stranger"  );
   console.log('data about uploading',success.url);
   }, function (error) {
   console.log(error);
   })
   }, function (error) {
   console.log(error);
   })
   };

   $scope.playStrangerCM = function(){
   var soundToPlay = soundPickerService.getSound("stranger");
   var my_media = new Media(soundToPlay.url,
   function () {
   console.log("playAudio():Audio Success");
   },
   // error callback
   function (err) {
   console.log("playAudio():Audio Error: " + err);
   }
   );
   my_media.play();
   console.log("stranger Duration");
   console.log(soundToPlay.duration);
   $scope.StrangerCMTotalDuration = soundToPlay.duration;
   $scope.StrangerCMDuration = 0;
   var timesRun = 0;
   var interval = setInterval(function(){
   timesRun += 1;
   if(timesRun >= $scope.StrangerCMTotalDuration){
   $scope.$apply(function () {
   $scope.StrangerCMTotalDuration = 0;
   });
   clearInterval(interval);
   }
   $scope.$apply(function () {
   $scope.StrangerCMDuration += 1;
   });
   //do whatever here..
   }, 1000);
   };
   /!*----- Stranger end ----- *!/

   /!*----- voice Start ----- *!/

   $scope.editVoiceCM = function(){
   soundService.getSound().then(function (data) {
   soundService.uploadSound(data)
   .then(function (success) {
   soundPickerService.setSound(success.url,success.duration , "voice"  );
   console.log('data about uploading',success.url);
   }, function (error) {
   console.log(error);
   })
   }, function (error) {
   console.log(error);
   })
   };
   $scope.playVoiceCM = function(){
   var soundToPlay = soundPickerService.getSound("voice");
   var my_media = new Media(soundToPlay.url,
   function () {
   console.log("playAudio():Audio Success");
   },
   // error callback
   function (err) {
   console.log("playAudio():Audio Error: " + err);
   }
   );
   my_media.play();
   console.log("stranger Duration");
   console.log(soundToPlay.duration);
   $scope.VoiceCMTotalDuration = soundToPlay.duration;
   $scope.VoiceCMDuration = 0;
   var timesRun = 0;
   var interval = setInterval(function(){
   timesRun += 1;
   if(timesRun >= $scope.VoiceCMTotalDuration){
   $scope.$apply(function () {
   $scope.VoiceCMTotalDuration = 0;
   });
   clearInterval(interval);
   }
   $scope.$apply(function () {
   $scope.VoiceCMDuration  += 1;
   });
   //do whatever here..
   }, 1000);
   };
   /!*----- voice end ----- *!/
   })*/
 /* .controller('VoicemailHistoryCtrl', function (toastService, $timeout, $scope, $ionicScrollDelegate, $ionicHistory, $state, $stateParams, $rootScope, MediaManager, $ionicPopup, voicemailService, blockedService) {
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
      /!*
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

       *!/
    };
    getVoiceMailHistory();
  });


*/
