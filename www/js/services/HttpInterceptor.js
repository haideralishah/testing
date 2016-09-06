/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')

  .factory('HttpInterceptor', function ($q, $rootScope , localStorageService , $injector,$location) {
    return {
      request: function (config) {
        var $ionicLoading = $injector.get('$ionicLoading')
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });

        return config || $q.when(config)
      },

      requestError: function (rejection) {
        console.log('rejected');
        return $q.reject(rejection);
      },

      response: function (response) {
        var $ionicLoading = $injector.get('$ionicLoading')
        $ionicLoading.hide();
        //$rootScope.$broadcast('loading:hide')
        return response || $q.when(response);
      },

      responseError: function (rejection) {
        console.log('rejected', rejection);

        /* Forcefully logout User if authorization == false */
        if(rejection.data && rejection.data.authorization == false){
          var ToastService = $injector.get('toastService');
          var $ionicLoading = $injector.get('$ionicLoading')
          $ionicLoading.hide();
          if(localStorageService.getData("userLoginData")){
            ToastService.showToast('Session Expired. Please Signin to continue.');
          }
          localStorageService.setData("blockedContacts",[]);
          localStorageService.setData("contacts",[]);
          localStorageService.setData("userCallsInfo" ,[]);
          localStorageService.setData("userDeviceToken",null);
          localStorageService.setData("userInfo",{});
          localStorageService.setData("userLoginData",null);
          $location.path('/sign-in');
        }
        else{
          var $ionicLoading = $injector.get('$ionicLoading');
          $ionicLoading.hide();
        }
        return $q.reject(rejection);
      }
    }
  })
