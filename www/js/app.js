// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ksSwiper', 'ngCordova', 'rzModule', 'angularMoment', 'cloudinary', 'ionic-audio', 'ionic-native-transitions'])

  .run(function ($ionicPlatform, $cordovaSplashscreen, $rootScope, localStorageService, $state, $cordovaStatusbar, pushNotificationService) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        $cordovaStatusbar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#1E5799");
        //StatusBar.hide();
      }
      function keyboardHandler(event) {
        $rootScope.$broadcast(event);
      }

      $rootScope.fromState = "";
      $rootScope.fetchContacts = true;
      $rootScope.refreshHistory = true;
      $rootScope.fetchBlocked = true;
      $rootScope.fetchUserInfo = true;


      pushNotificationService.pushRegister();

      /*var push = PushNotification.init({
       android: {
       senderID: "12345679"
       },
       ios: {
       //"senderID": "XXXX",
       "gcmSandbox": "false",
       "alert": "true",
       "badge": "true",
       "sound": "true"
       },
       windows: {}
       });

       push.on('registration', function(data) {
       console.log(data);
       //localStorageService.setData('userDeviceType', data.registrationId);
       // data.registrationId
       });

       push.on('notification', function(data) {
       console.log(data);
       // data.message,
       // data.title,
       // data.count,
       // data.sound,
       // data.image,
       // data.additionalData
       });

       push.on('error', function(e) {
       console.log(e);
       // e.message
       });*/

      //$rootScope.notificationCount = 0;

      /*$window.addEventListener('native.keyboardshow', keyboardHandler('native.keyboardshow'));
       $window.addEventListener('native.keyboardhide', keyboardHandler('native.keyboardhide'));*/
      //$rootScope.userContacts = localStorageService.getData('contacts')

    })

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      //alert(JSON.stringify(toState));
      if(toState.name == 'changePassword'){

      }
      else if (toState.name != 'signin' && toState.name != 'signup' && localStorageService.getData('userLoginData') == null && toState.name != 'home') {
        event.preventDefault();
        $state.go('signin');
      }
      else if (toState.name == 'home' && localStorageService.getData('userLoginData') != null) {
        event.preventDefault();
        $state.go('tab.dash');
      }
    })


    $rootScope.gotoContactScreen = function () {
      $state.go('tab.contacts');
    }

    $rootScope.gotoDashScreen = function () {
      $state.go('tab.dash');
    }

    $rootScope.ccodeMask = function (number) {
      if (number.length < 11 && number != "" && number.substring(0, 1) != "1") {
        number = "1" + number;
      }
      return number;
    }

    $rootScope.logoutOnUnAuth = function (event) {
      authService.logout();
    }

  })

  .directive('autoListDivider', function ($timeout) {
    var lastDivideKey = "";

    return {
      link: function (scope, element, attrs) {
        lastDivideKey = "";
        var key = attrs.autoListDividerValue;

        var defaultDivideFunction = function (k) {
          return k.slice(0, 1).toUpperCase();
        }

        var doDivide = function () {
          var divideFunction = scope.$apply(attrs.autoListDividerFunction) || defaultDivideFunction;
          var divideKey = divideFunction(key);

          if (divideKey != lastDivideKey) {
            var contentTr = angular.element("<div class='item item-divider item-divider-custom'>" + divideKey + "</div>");
            element[0].parentNode.insertBefore(contentTr[0], element[0]);
          }

          lastDivideKey = divideKey;
        }

        $timeout(doDivide, 0)
      }
    }
  })

  .filter('groupByMonthYear', function ($parse) {

    var dividers = {};

    return function (input) {
      if (!input || !input.length) return;

      input = input.sort(function (a, b) {
        if (a.firstName.split(" ")[0] < b.firstName.split(" ")[0]) return -1;
        if (a.firstName.split(" ")[0] > b.firstName.split(" ")[0]) return 1;
      })

      var output = [],
        previousElem,
        currentElement;

      for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {

        currentElement = item.firstName.slice(0, 1).toUpperCase();
        if (!previousElem || currentElement != previousElem) {
          var dividerId = currentElement;

          if (!dividers[dividerId]) {
            dividers[dividerId] = {
              isDivider: true,
              divider: currentElement,
              firstName: currentElement,
              id: currentElement
            };
          }

          output.push(dividers[dividerId]);
          console.log(output);

        }
        /*	currentDate = moment(item.date);
         if (!previousDate ||
         currentDate.month() != previousDate.month() ||
         currentDate.year() != previousDate.year()) {

         var dividerId = currentDate.format('MMYYYY');

         if (!dividers[dividerId]) {
         dividers[dividerId] = {
         isDivider: true,
         divider: currentDate.format('MMMM YYYY')
         };
         }

         output.push(dividers[dividerId]);

         }*/
        output.push(item);

        previousElem = currentElement;
      }
      //output.sort(function(a, b){return a.name-b.name});
      return output;
    };

  }).directive('dividerCollectionRepeat', function ($parse) {
    return {
      priority: 1001,
      compile: compile
    };

    function compile(element, attr) {
      var height = attr.itemHeight || '73';
      attr.$set('itemHeight', 'item.isDivider ? 37 : ' + height);

      element.children().attr('ng-hide', 'item.isDivider');
      element.prepend(
        '<div class="ng-hide" ng-show="item.isDivider" ng-bind="item.divider" style="color:#46a5f3;font-weight: 500;" id="item.id"></div>'
      );
    }
  }).filter('telephoneformat', function () {
    return function (tel) {
      if (!tel) {
        return '';
      }

      if (tel.length == 10 || (tel.length == 11 && tel.substring(0, 1) == 1)) {
        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
          return tel;
        }

        var country, city, number;

        switch (value.length) {
          case 10: // +1PPP####### -> C (PPP) ###-####
            country = 1;
            city = value.slice(0, 3);
            number = value.slice(3);
            break;

          case 11: // +CPPP####### -> CCC (PP) ###-####
            country = value[0];
            city = value.slice(1, 4);
            number = value.slice(4);
            break;

          case 12: // +CCCPP####### -> CCC (PP) ###-####
            country = value.slice(0, 3);
            city = value.slice(3, 5);
            number = value.slice(5);
            break;

          default:
            return tel;
        }

        if (country == 1) {
          country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
      } else {
        return tel;
      }
    };
  })

  .config(['cloudinaryProvider', function (cloudinaryProvider, cloudinary) {
    cloudinaryProvider
      .set("cloud_name", "dwzocila9")
      .set("upload_preset", "ceulzhuf")

  }])


  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider, $ionicNativeTransitionsProvider) {
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.views.transition('none');
    $ionicNativeTransitionsProvider.enable(false);
    $ionicConfigProvider.views.maxCache(0);
    $httpProvider.interceptors.push('HttpInterceptor');

    /*
     $ionicNativeTransitionsProvider.setDefaultTransition({
     type: 'slide',
     direction: 'left'
     });*/


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: 'templates/home-page.html',
        controller: 'homeCtrl'
      })
      .state('changePassword', {
        url: '/change-password',
        templateUrl: 'templates/change-password.html',
       // template : '<h1>Hi to the world</h1>',
        controller: 'changePasswordCtrl'
      })
      .state('signin', {
        url: '/sign-in',
        templateUrl: 'templates/sign-in.html',
        controller: 'SignInCtrl'
      })
      .state('signup', {
        url: '/sign-up',
        templateUrl: 'templates/sign-up.html',
        controller: 'signUpCtrl'
      })
      .state('add-blocked', {
        url: '/add-blocked',
        templateUrl: 'templates/add-blockedNum.html',
        //controller: 'homeCtrl'
      })
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      // Each tab has its own nav history stack:
      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('tab.voicemail', {
        url: '/voicemail',
        views: {
          'tab-dash': {
            templateUrl: 'templates/voicemail.html',
            controller: 'VoicemailCtrl'
          }
        }
      })
      .state('tab.customvoicemail', {
        url: '/customvoicemail',
        views: {
          'tab-settings': {
            templateUrl: 'templates/customvoicemail.html',
            controller: 'CustomVoicemailCtrl'
          }
        }
      })
      .state('tab.voicemailHistory', {
        url: '/voicemailhistory',
        views: {
          'tab-dash': {
            templateUrl: 'templates/voicemail-history.html',
            controller: 'VoicemailHistoryCtrl'
          }
        }
      })
      .state('tab.customVoiceMessages', {
        url: '/customvoicemessages',
        views: {
          'tab-settings': {
            templateUrl: 'templates/customVoiceMessages.html',
            controller: 'customVoiceMessagesCtrl'
          }
        }
      })
      .state('tab.history', {
        url: '/history?toggleState',
        views: {
          'tab-history': {
            templateUrl: 'templates/tab-history.html',
            controller: 'historyCtrl'
          }
        }
      })
      .state('tab.notifications', {
        url: '/notifications',
        views: {
          'tab-notifications': {
            templateUrl: 'templates/tab-notifications.html',
            //controller: 'notificationsCtrl'
          }
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'templates/tab-settings.html',
            controller: 'settingsCtrl'
          }
        }
      })
      .state('tab.quiet-hours', {
        url: '/quiet-hours',
        views: {
          'tab-settings': {
            templateUrl: 'templates/quiet-hours.html',
            controller: 'quietHoursCtrl'
          }
        }
      })
      /*TAB Contacts Start*/

      /*.state('tab.contacts', {
       url: '/contacts',
       abstract:true,
       templateUrl: 'templates/tab-contacts.html'
       /!*resolve: {
       stateData: function (contactsService, localStorageService, $rootScope) {
       console.log($rootScope.fetchContacts);
       if($rootScope.fetchContacts){
       var user = {
       userEmail: localStorageService.getData('userLoginData').userName
       }
       $rootScope.fetchContacts = false;
       return contactsService.getContacts(user)
       .then(function (response) {
       localStorageService.setData('contacts', response.message)
       return response;
       },function(err){
       localStorageService.setData('contacts', []);
       return err;
       })
       }else{
       $rootScope.test= false
       return localStorageService.getData('contacts')
       }
       }
       },*!/
       /!* views: {
       'tab-contacts': {
       templateUrl: 'templates/tab-contacts.html',
       controller: 'contactsCtrl'
       }
       }*!/
       })*/
      .state('tab.contacts', {
        url: '/contacts',
        resolve: {
          stateData: function (contactsService, localStorageService, $rootScope) {
            console.log($rootScope.fetchContacts);
            if ($rootScope.fetchContacts) {
              var user = {
                userEmail: localStorageService.getData('userLoginData').userName
              }
              $rootScope.fetchContacts = false;
              return contactsService.getContacts(user)
                .then(function (response) {
                  localStorageService.setData('contacts', response.message)
                  return response;
                }, function (err) {
                  //localStorageService.setData('contacts', []);
                  return err;
                })
            } else {
              $rootScope.test = false
              return localStorageService.getData('contacts')
            }
          }
        },
        views: {
          'tab-contacts': {
            templateUrl: 'templates/contactall.html',
            controller: 'contactsCtrl'
          }
        }
      })

      .state('tab.personal-blockList', {
        url: '/personal-blockList',
        views: {
          'tab-contacts': {
            templateUrl: 'templates/personal-blockList.html',
            controller: 'personalBlockListCtrl'
          }
        }
      })

      .state('tab.blockedNumber-detail', {
        url: '/blockedNumber-detail/:number',
        views: {
          'tab-contacts': {
            templateUrl: 'templates/blockedNumber-detail.html',
            controller: 'blockedNumberDetailCtrl'
          }
        }
      })

      .state('tab.strangerNumber-detail', {
        url: '/strangerNumber-detail/:id',
        views: {
          'tab-contacts': {
            templateUrl: 'templates/strangerNumber-detail.html',
            controller: 'strangerNumberDetailCtrl'
          }
        }
      })

      .state('tab.contactNumber-detail', {
        url: '/contactNumber-detail/:id',
        views: {
          'tab-contacts': {
            templateUrl: 'templates/contactNumber-detail.html',
            controller: 'contactNumberDetailCtrl'
          }
        }
      })

      .state('tab.add-blocked', {
        url: '/add-blocked',
        views: {
          'tab-contacts': {
            templateUrl: 'templates/add-blockedNum.html',
           /* controller: 'addBlockedCtrl'*/
          }
        }
      })


      .state('tab.add-contacts', {
        url: '/add-contacts/:number',
        views: {
          'tab-contacts': {
            templateUrl: 'templates/add-contacts.html',
            controller: 'addContactsCtrl'
          }
        }
      })


      .state('tab.profile', {
        url: '/profile/:id',
        views: {
          'tab-contacts': {
            templateUrl: 'templates/person-profile.html',
            controller: 'profileCtrl'
          }
        }
      })


    /*TAB Contacts End*/


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');

  });
