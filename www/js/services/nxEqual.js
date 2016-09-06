/**
 * Created by User on 8/19/2016.
 */
angular.module('starter.services')
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
