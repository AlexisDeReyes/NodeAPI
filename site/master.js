var masterApp = angular.module('masterApp', [
    'ngRoute',
    'registryControllers'
]);

masterApp.config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/Register', {
            templateUrl: '../views/Register.html',
            controller: 'BlankController'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);

masterApp.controller('RegisterController', [
    '$scope', '$http', function($scope, $http) {

        $scope.Register = {};
        $scope.currentuser = {};
        $scope.currentuser.loggedin = false;
        $scope.currentuser.display = "";

        $scope.RegisterUser = function() {
            if ($scope.Register.email != undefined && $scope.Register.password != undefined && $scope.Register.name != undefined) {
                $scope.Request.Post('user', $scope.Register).success(function(data) {
                    $scope.Currentuser.name = data.name;
                    $scope.Currentuser.display = data.name;
                    $scope.Currentuser.loggedin = true;
                }).error(function() {
                    $scope.error.register = true;
                });
            }
        };

        $scope.Register.IsValid = function (key) {
            var input = $scope.Register[key];
            key = key != 'password2' ? key : 'Password';

            var itIs = ValidGrammer[key](input);

            $scope.Register.Valid = $scope.Register.Valid ? itIs : false;

            return itIs;
        }


       

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


var ValidGrammer = {
    Email: function(email) {
        var regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;
        return regex.test(email);
    },
    Password: function(password) {
        var regex = /[A-Z0-9]{4,16}/i;
        return regex.test(password);
    }

};
