angular.module('myApp')
    .controller('loginCtrl', function($scope, $http, $location, $localStorage, $rootScope, $sessionStorage,Services) {

        $scope.userDetails = {};
        // $sessionStorage.logged=false;
        $rootScope.logged = false;
        $localStorage.logged = true;
        $sessionStorage.search="";
        $scope.logout=false;  
        // $localStorage.session=false;          

        $scope.login = function() {

            // console.log($scope.userDetails);

            if ($scope.userDetails.email == null || $scope.userDetails.password == null) {

                alert("email or password is null");
            } else {

                $http.post('/login', $scope.userDetails).then(function(response) {

                    console.log(response.data);
                    if (response.data == "true") {
                        alert("please enter correct credentials");
                    } else {

                        $localStorage.session=true;
                        $scope.logout=Services.setLogout();
                        $location.path('/customers/cardView');


                    }
                });
            }

        };
    });
