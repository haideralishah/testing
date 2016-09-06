angular.module('starter.services', [])

.constant('apiURL', "https://testingplivo.herokuapp.com")
  //.constant('apiURL', "http://telecalm.herokuapp.com")
  //.constant('apiURL',"http://localhost:3000")



  /*Commented All Sections and replace in Services Different File*/

  /*/!*Service For handling LocalStorage*!/
  .factory('localStorageService', function () {
    return {
      setData: function (objectKey, data) {
        localStorage.setItem(objectKey, JSON.stringify(data));
      },
      getData: function (objectKey) {
        if (JSON.parse(localStorage.getItem(objectKey) != null)) {
          return JSON.parse(localStorage.getItem(objectKey));
        } else {
          return localStorage.setItem(objectKey, null);
        }
      }
    }
  })*/

 /* .factory('imageService',function($http, $state, $q, localStorageService, $cordovaFileTransfer, cloudinary, $ionicLoading, $cordovaImagePicker){
    return{
      getPictures: function(){
        var deferred = $q.defer();
        var options = {
          maximumImagesCount: 1,
          width: 800,
          height: 800,
          quality: 80
        };
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            console.log(results);
            fileURL = results[0];
            if(fileURL.length != 0){
              console.log(fileURL);
              deferred.resolve(fileURL);
            }
          }, function(error) {
            deferred.reject(error);
          });
        return deferred.promise
      },


      uploadImage: function(fileURL){
        var deferred = $q.defer();
        var CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/' + cloudinary.config().cloud_name + '/upload';

        console.log(fileURL);
        var uploadOptions = {
          params : { 'upload_preset': cloudinary.config().upload_preset},
          resource_type : "raw"
        };
        $cordovaFileTransfer.upload(CLOUDINARY_UPLOAD_URL, fileURL, uploadOptions)
          .then(function(result) {
            $ionicLoading.show({template : 'Upload Completed', duration: 1000});
            console.log(result);
            var response = JSON.parse(decodeURIComponent(result.response));
            deferred.resolve(response);
          }, function(err) {
            console.log(err)
            $ionicLoading.show({template : 'Upload Failed', duration: 3000});
            deferred.reject(err);
          }, function (progress) {
            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
          });
        return deferred.promise
      }
    }
   })*/

  /*.factory('validation', function () {
    return {
      validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      validateName: function (name) {
        var re = /^[a-zA-Z ]*$/;
        return re.test(name);
      },

      validatePassword: function (password) {
        var re = /^([A-Za-z0-9!@#\$%\^&\*]{5,})$/;
        return re.test(password);
      }
    }
  })*/

 /* .factory('HttpInterceptor', function ($q, $rootScope , localStorageService , $injector,$location) {
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

        /!* Forcefully logout User if authorization == false *!/
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
  })*/

/*
  .factory('authService', function ($http, $state, $q, localStorageService, apiURL,$rootScope) {
    return {
      signUp: function (data) {
        var defer = $q.defer();
        $http.post(apiURL + "/signup", data)
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      logIn: function (data) {
        data.userDeviceToken = localStorageService.getData('userDeviceToken');
        if(ionic.Platform.isIOS()){
          data.userDeviceType = "IOS"
        }
        else{
          data.userDeviceType = "Android"
        }

        var defer = $q.defer();
        $http.post(apiURL + "/signin", data)
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              response.data.userName = response.config.data.userEmail
              localStorageService.setData("userLoginData", response.data);
              $rootScope.fetchUserInfo = true;
              defer.resolve();
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error.status == '401') {
              defer.reject({status: false, "message": "Invalid Username or Password"});
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },
       changePassword : function (data){
        var defer = $q.defer();
        $http.post(apiURL + '/changePassword', data)
          .then(function (response) {
            if (response.status == 200) {
              defer.resolve('Successfully change password');
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },
      verifyEmail : function (data) {
        data.userDeviceToken = localStorageService.getData('userDeviceToken');
        if(ionic.Platform.isIOS()){
          data.userDeviceType = "IOS"
        }
        else{
          data.userDeviceType = "Android"
        }
        var defer = $q.defer();
        $http.get(apiURL + "/forgetPassword/"+ data.userEmail  , data)
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              response.data.userName = response.data.userEmail;
              defer.resolve({status: false, "message":  response.data.message });
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error.status == '401') {
              defer.reject({status: false, "message": "Invalid Username or Password"});
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          });
        return defer.promise;
      },
      logout: function (){

        var defer = $q.defer();

        var config = {};
        var data = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header


        $http.post(apiURL + '/logout',data, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200 && response.data && response.data.status) {
              defer.resolve('Successfully Logout');
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;

      },

      updateUserOutgoingCalls: function (data){

        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        };

        config.headers = header;

        $http.post(apiURL + '/updateUserOutgoingCalls', data, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          });
        return defer.promise;

      },

      getUserInfo: function(){
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header


        $http.get(apiURL + '/getUserInfo', config)
          .then(function (response) {
            console.log(response);
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      }
    }
  })
*/

  /*.factory('quietHoursService', function ($http, $state, $q, localStorageService, apiURL) {

    return {
      getQuietHours: function (user) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header


        $http.get(apiURL + '/getQuietHours', config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      setQuietHours: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header

        $http.post(apiURL + '/saveQuietHours', data, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      }

    }
  })*/

  /*.factory('contactsService', function ($http, $state, $q, localStorageService, apiURL) {

    return {
      getContacts: function (user) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.get(apiURL + '/getContacts', config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      saveContacts: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header

        $http.post(apiURL + '/saveContacts', data, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      updateContact: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header

        $http.post(apiURL + '/updateContact', data, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },
      deleteContact: function (id) {
        var defer = $q.defer();

        var config = {};

        var _id = {
          _id: id
        }

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.post(apiURL + '/deleteContact', _id, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },
      isAlreadyAContact: function (data) {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }
        config.headers = header;

        $http.post(apiURL + '/isInContact', {"userEmail": data.userEmail,"number":data.number}, config)
          .then(function (response) {
            if (response.status) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      }

    }
  })*/

 /* .factory('historyService',function($http, $state, $q,localStorageService,apiURL) {

    return {

      getHomeHistory : function () {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.get(apiURL + '/getUserCallsInfo', config)
          .then(function (response) {
            if (response.status == 200) {
              localStorageService.setData("userCallsInfo", response.data.message);
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              console.log(error);

              if(error.statusText == "Unauthorized"){

                defer.reject({status: false, "message": "Error Occured. Please Try Again."  });
              }

            }
          })
        return defer.promise;
      },

      getHistoryWithOffset: function (offset) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        config.headers = header;
        $http.get(apiURL + '/getUserCallsInfo_offset/'+offset, config)
          .then(function (response) {
            if (response.status == 200) {
              localStorageService.setData("userCallsInfo", response.data.message);
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              console.log(error);

              if(error.statusText == "Unauthorized"){

                defer.reject({status: false, "message": "Error Occured. Please Try Again."  });
              }

            }
          })
        return defer.promise;
      }
    }
  })*/

 /* .factory('localStorageUpdateBlockedService', function ($http, $state, $q, localStorageService, apiURL) {

    return {
      addToBlocked: function (item) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("blockedContacts");
        if (oldData) {
          oldData.push(item);
          localStorageService.setData("blockedContacts", oldData);
          defer.resolve();
        } else {
          localStorageService.setData("blockedContacts", oldData);
          defer.resolve();
        }
        return defer.promise;
      },

      deleteFromBlocked: function (id) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("blockedContacts");
        if (oldData) {
          oldData.forEach(function (data, index) {
            if (oldData[index]._id == id) {
              oldData.splice(index, 1);
            }
          });
          localStorageService.setData("blockedContacts", oldData);
          defer.resolve();
        } else {
          defer.reject({status: false, "message": "Error Occured. Please Try Again."});
        }
        return defer.promise;
      }
    }
  })*/

  /*.factory('localStorageUpdateService', function ($http, $state, $q, localStorageService, apiURL) {

    return {
      addToContacts: function (item) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("contacts");
        if (oldData) {
          oldData.push(item);
          localStorageService.setData("contacts", oldData);
          defer.resolve();
        } else {
          localStorageService.setData("contacts", oldData);
          defer.resolve();
        }
        return defer.promise;
      },
      updateToContacts: function (id, item) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("contacts");
        if (oldData) {
          oldData.forEach(function (data, index) {
            if (oldData[index]._id == id) {
              oldData[index] = item;
            }
          });
          localStorageService.setData("contacts", oldData);
          defer.resolve();
        } else {
          defer.reject({status: false, "message": "Error Occured. Please Try Again."});
        }
        return defer.promise;
      }
      ,
      deleteFromContacts: function (id) {
        var defer = $q.defer();
        var oldData = localStorageService.getData("contacts");
        if (oldData) {
          oldData.forEach(function (data, index) {
            if (oldData[index]._id == id) {
              oldData.splice(index, 1);
            }
          });
          localStorageService.setData("contacts", oldData);
          defer.resolve();
        } else {
          defer.reject({status: false, "message": "Error Occured. Please Try Again."});
        }
        return defer.promise;
      }
    }
  })
*/
 /* .factory('toastService', function ($cordovaToast, $ionicPopup) {
    return {
      showToast: function (message) {

        if (!!window.cordova) {
          $cordovaToast.showLongBottom(message).then(function (success) {
          }, function (error) {
            console.log(error);
          });
        }
        else {
          $ionicPopup.alert({
            title: 'Alert',
            cssClass: 'activeBackground',
            template: message
          });
        }

      }
    }
  })*/

  /*.factory('strangerService', function($http, $state, $q, localStorageService, apiURL){
    return {
      moveStranger: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.post(apiURL + '/moveStrangerToBlock', data, config)
          .then(function (response) {
            console.log(response)
            if (response.status) {
              defer.resolve(response.data);
            }
            else {
              console.log(response.message)
              defer.reject({status: false, "message": "Stranger Not Moved"});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      }
    }

  })*/

  /*.factory('blockedService', function($http, $state, $q, localStorageService, apiURL){
    return {
      deleteBlocked: function (number) {
        var defer = $q.defer();

        var config = {};

        var blockedNumber = {
          blockedNumber: number
        }

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.post(apiURL + '/deleteBlocked', blockedNumber, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      getBlocked: function () {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.get(apiURL + '/getBlockedNumber', config)
          .then(function (response) {
            console.log(response);
            if (response.status) {
              response.data.message.forEach(function(data,ind){
                response.data.message[ind].firstName = data.blockedName;
              })
              localStorageService.setData("blockedContacts", response.data.message);
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      saveBlocked : function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;
        newBlockedNumber = {
          userEmail: data.userEmail,
          blockedName: data.blockedName?data.blockedName:(data.contactFirstName+data.contactLastName?" "+data.contactLastName:""),
          blockedNumber: data.blockedNumber?data.blockedNumber:data.fromCaller
        }
        $http.post(apiURL + '/saveBlockedNumber', newBlockedNumber, config)
          .then(function (response) {
            console.log(response);
            if (response.status) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      updateBlocked: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.post(apiURL + '/updateBlockedContact', data, config)
          .then(function (response) {
            console.log(response);
            if (response.status) {
              //alert(response.status);
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },
      isAlreadyBlocked: function (data) {
      var defer = $q.defer();
      var config = {};
      var header = {
        'Content-Type': 'application/json',
        'Authorization': localStorageService.getData("userLoginData").access_token
      }
      config.headers = header;
      $http.post(apiURL + '/isInBlocked', {"userEmail": data.userEmail,"number":data.number}, config)
        .then(function (response) {
          if (response.status) {
            defer.resolve(response.data);
          } else {
            console.log(response.message)
            defer.reject({status: false, "message": "Error Occured. Please Try Again."});
          }
        }, function (error) {
          if (error) {
            defer.reject({status: false, "message": "Error Occured. Please Try Again."});
          }
        })
      return defer.promise;
    }
    }
  })*/

  /*.factory('voicemailService',function($http, $state, $q,localStorageService,apiURL) {

    return {
      getVoiceMailInfo: function () {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;

        $http.get(apiURL + '/getUserVoiceMailInfo', config)
          .then(function (response) {
             //console.log('this' + JSON.stringify(response));
            if (response.data.status == true) {
              console.log(response.data.message)
              localStorageService.setData("userVoicemails", response.data.message);
              defer.resolve(response.data);
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },


      updateVoiceMailInfo: function (id) {
        var defer = $q.defer();


        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;
        var data = {
          _id : id
        }

        $http.post(apiURL + '/updateVoicemailNotification', data, config)
          .then(function (response) {
            //console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              console.log('Updated')
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      getNotificationCount: function () {
        var defer = $q.defer();


        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;


        $http.get(apiURL + '/getNotificationCount', config)
          .then(function (response) {
            if (response.data.status == true) {
              defer.resolve(response.data);
              console.log(response.data)
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      deleteVoiceMail: function (id) {
        var defer = $q.defer();


        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        var data = {}

        config.headers = header;

        $http.post(apiURL + '/deleteVoiceMail/' + id, data, config)
          .then(function (response) {
            //console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              console.log('Updated')
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      }
    }
  })*/

  /*.factory('customMessageService',function($http, $state, $q,localStorageService,apiURL) {

    return {
      getCustomMessageInfo: function () {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        };
        config.headers = header;
        $http.get(apiURL + '/getVoiceMessage', config)
          .then(function (response) {
            if (response.data.status == true) {
              console.log(response.data.message);
          /!*    localStorageService.setData("userVoicemails", response.data.message);*!/
              defer.resolve(response.data);
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          });
        return defer.promise;
      },
      postCustomMessageInfo: function (data) {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        };
        config.headers = header;
        $http.post(apiURL + '/setVoiceMessage',data,config)
          .then(function (response) {
            if (response.data.status == true) {
              /!*    localStorageService.setData("userVoicemails", response.data.message);*!/
              defer.resolve(response.data);
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          });
        return defer.promise;
      }
     /!* updateVoiceMailInfo: function (id) {
        var defer = $q.defer();


        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;
        var data = {
          _id : id
        }

        $http.post(apiURL + '/updateVoicemailNotification', data, config)
          .then(function (response) {
            //console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              console.log('Updated')
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      getNotificationCount: function () {
        var defer = $q.defer();


        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header;


        $http.get(apiURL + '/getNotificationCount', config)
          .then(function (response) {
            if (response.data.status == true) {
              defer.resolve(response.data);
              console.log(response.data)
            } else {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      deleteVoiceMail: function (id) {
        var defer = $q.defer();


        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        var data = {}

        config.headers = header;

        $http.post(apiURL + '/deleteVoiceMail/' + id, data, config)
          .then(function (response) {
            //console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              console.log('Updated')
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      }*!/
    }
  })*/

  /*.factory('plivoSettingsStatusService', function ($http, $state, $q, localStorageService, apiURL) {

    return {
      getPlivoRulesStatus: function () {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header


        $http.get(apiURL + '/getPlivoRulesStatus', config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      },

      setPlivoRulesStatus: function (data) {
        var defer = $q.defer();

        var config = {};

        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        }

        config.headers = header

        $http.post(apiURL + '/setPlivoRulesStatus', data, config)
          .then(function (response) {
            console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      }

    }
  })*/

  /*.factory('pushNotificationService', function ($http, $state, $q, localStorageService, $rootScope) {

    return {
      pushRegister: function () {
        /!*$rootScope.push = PushNotification.init({
          android: {
            senderID: "163879100221"
          },
          ios: {
            "gcmSandbox": "false",
            "alert": "true",
            "badge": "true",
            "sound": "true"
          },
          windows: {}
        });

        $rootScope.push.on('registration', function(data) {
          console.log(data);
          localStorageService.setData('userDeviceToken', data.registrationId);
        });*!/

        /!*$rootScope.push.on('notification', function(data) {
          // data.message,
          // data.title,
          // data.count,
          // data.sound,
          // data.image,
          // data.additionalData
        });

        $rootScope.push.on('error', function(e) {
          // e.message
        });*!/
      },

      pushUnregister: function() {
        $rootScope.push.unregister(function() {
          console.log('success unregister');
        }, function() {
          console.log('error');
        });
      }

    }
  })
*/
 /* .factory('soundService',function(apiURL,$http, $state, $q, localStorageService, $cordovaFileTransfer, cloudinary, $ionicLoading, $cordovaCapture){

    var fileUrl = '';
    return{
      fileUrl: fileUrl,
      getSound: function(){
        var deferred = $q.defer();
        var options = {limit: 1, duration: 10, format:"audio/wav"};
        $cordovaCapture.captureAudio(options).then(function (audioData) {
          console.log(audioData)
          deferred.resolve(audioData[0].fullPath);
        }, function (err) {
          console.log(err);
          deferred.reject(err);
        });
        return deferred.promise
      },


      uploadSound: function(fileURL){
        var deferred = $q.defer();
        var CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/' + cloudinary.config().cloud_name + '/video/upload';

        console.log(fileURL);
        var uploadOptions = {
          params : { 'upload_preset': cloudinary.config().upload_preset}
        };
        $cordovaFileTransfer.upload(CLOUDINARY_UPLOAD_URL, fileURL, uploadOptions)
          .then(function(result) {
             $ionicLoading.show({template : '' , duration: 1000});
            console.log(result);
            var response = JSON.parse(decodeURIComponent(result.response));
            deferred.resolve(response);
          }, function(err) {
            console.log(err)

            $ionicLoading.show({template : 'Upload Failed', duration: 3000});
            deferred.reject(err);
          }, function (progress) {
            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
          });
        return deferred.promise
      },

      saveVoiceMessages: function (data) {
        var defer = $q.defer();
        var config = {};
        var header = {
          'Content-Type': 'application/json',
          'Authorization': localStorageService.getData("userLoginData").access_token
        };
        config.headers = header;
        $http.post(apiURL + '/setVoiceMessage', data, config)
          .then(function (response) {
            //console.log('this' + JSON.stringify(response));
            if (response.status == 200) {
              console.log('Updated')
              defer.resolve(response.data);
            } else {
              console.log(response.message)
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          }, function (error) {
            if (error) {
              defer.reject({status: false, "message": "Error Occured. Please Try Again."});
            }
          })
        return defer.promise;
      }


    }
  })*/
  /*.factory("soundPickerService",function(){

    var contactSound = {};
    var contactDuration = 0;

    var quiteSound = {};
    var quiteDuration =0 ;


    var strangerSound = {};
    var strangerDuration =0 ;

    var voiceSound = {};
    var voiceDuration =0 ;

    var setSound = function(sound,duration,param){
      if(param == "contact") {
        contactSound.url = sound;
        contactSound.duration = duration;
      }
      if(param == "quite") {
        quiteSound.url = sound;
        quiteSound.duration = duration;
      }
      if(param == "stranger") {
        strangerSound.url = sound;
        strangerSound.duration = duration;
      }
      if(param == "voice") {
        voiceSound.url = sound;
        voiceSound.duration = duration;
      }
    };
    var getSound = function(param){
      if(param == "contact"){
        return  contactSound;
      }
      if(param == "quite"){
        return quiteSound;
      }
      if(param == "stranger"){
        return strangerSound;
      }
      if(param == "voice"){
        return voiceSound;
      }
    };
    var setDuration = function(duration,param){
      if(param == "contact"){
        contactDuration = duration;
      }
      if(param == "quite"){
        var quiteDuration = duration ;
      }
      if(param == "stranger"){
        var strangerDuration = duration ;
      }
      if(param == "voice"){
        var voiceDuration = duration ;
      }
    };
    var getDuration = function(param){
      if(param =="contact") {
        return   contactDuration ;
      }
      if(param == "quite"){
        return quiteDuration;
      }
      if(param == "stranger"){
        return strangerDuration;
      }
      if(param == "voice"){
        return voiceDuration;
      }
    };
    return {
      setSound:setSound,
      getSound:getSound,
      setDuration:setDuration,
      getDuration:getDuration
    }
  })
  .filter('digits', function() {
  return function(input) {
    if (input < 10) {
      input = '0' + input;
    }

    return input;
  }
})*/
  .directive('nxEqual', function() {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, model) {
        if (!attrs.nxEqual) {
          console.error('nxEqual expects a model as an argument!');
          return;
        }
        scope.$watch(attrs.nxEqual, function (value) {
          model.$setValidity('nxEqual', value === model.$viewValue);
        });
        model.$parsers.push(function (value) {
          var isValid = value === scope.$eval(attrs.nxEqual);
          model.$setValidity('nxEqual', isValid);
          return isValid ? value : undefined;
        });
      }
    };
  });
