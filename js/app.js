(function() {
  angular
    .module('openpaas.doc', ['ngResource', 'ngRoute', 'swaggerUi', 'ngAnimate', 'ngSanitize'])

    .config(function ($routeProvider) {
      $routeProvider
        .when('/api', {
          templateUrl: '/api',
          controller: 'OPDocApiController'})
        .when('/', {
          templateUrl: '/main',
          controller: 'OPDocApiController'})
        .otherwise({
          redirectTo: '/'
      });
    })

    .run(function(swaggerModules, swagger1ToSwagger2Converter, swaggerUiExternalReferences, swaggerAuthentication){
      swaggerModules.add(swaggerModules.BEFORE_PARSE, swaggerUiExternalReferences);
      swaggerModules.add(swaggerModules.BEFORE_PARSE, swagger1ToSwagger2Converter);
    })

    .controller('OPDocApiController', function ($scope, $http, swaggerTranslator) {

      $scope.getLanguage = function() {
        return swaggerTranslator.language();
      }

      $scope.setLanguage = function(idLang) {
        swaggerTranslator.useLanguage(idLang);
      }

      $scope.myErrorHandler = function (data, status) {
        alert('failed to load swagger: ' + status + '   ' + data);
      };

      $scope.isLoading = false;
      $scope.infos = false;

      $scope.setLanguage('en');
    });
})();
