var masterApp = angular.module('masterApp', [
    'ngRoute',
    'registryControllers'
]);

masterApp.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: '../views/register.html',
            controller: 'BlankController'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);

masterApp.controller('RegisterController', [
    '$scope', '$http', function($scope, $http) {

        $scope.register = {};
        $scope.currentuser = {name:''};
        $scope.currentuser.loggedin = false;

        $scope.RegisterUser = function() {
            if ($scope.register.email != undefined && $scope.register.password != undefined && $scope.register.name != undefined) {
                $scope.Request.Post('user', $scope.register).success(function(data) {
                    $scope.currentuser = data;
                }).error(function() {
                    $scope.error.register = true;
                });
            }
        };

        $scope.Request = {
            Get: function (myUrl) {
                return $http({
                    cache: false,
                    url: RegistryEndpoint + myUrl,
                    accept: 'application/json',
                    method: 'get',
                    withCredentials: false
                });
            },
            Post: function (myUrl, postData) {
                return $http({
                    cache: false,
                    url: RegistryEndpoint + myUrl,
                    accept: 'application/json',
                    method: 'post',
                    data: postData,
                    withCredentials: false
                });
            },
            Put: function (myUrl, postData) {
                return $http({
                    cache: false,
                    url: RegistryEndpoint + myUrl,
                    accept: 'application/json',
                    method: 'put',
                    data: postData,
                    withCredentials: false
                });
            },
            Delete: function (myUrl) {
                return $http({
                    cache: false,
                    url: RegistryEndpoint + myUrl,
                    method: 'delete',
                    withCredentials: false
                });
            }
        };
    }
]);

