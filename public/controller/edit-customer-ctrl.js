angular.module('myApp')
    .controller('editCustomerCtrl', function($scope, $http, $location, $sessionStorage, $rootScope, $localStorage) {

            $scope.customer = $sessionStorage.customer;
            console.log($scope.customer);

            $scope.editCustomer = function() {



                if ($scope.customer.gender == "male") {
                    console.log($scope.customer);
                    $scope.customer.pic = "images/male.png";
                } else if ($scope.customer.gender == "female") {
                    console.log($scope.customer);
                    $scope.customer.pic = "images/female.png";
                }

                $http.post('/customers/editCustomer', $scope.customer).then(function(response) {
                    // console.log(response.data);
                    $location.path('/customers/cardView');
                });
            };

            $scope.deleteCustomer = function() {
            	$http.post('/customers/deleteCustomer', $scope.customer).then(function(response) {
                    // console.log(response.data);
                    $location.path('/customers/cardView');
                });
            };

        console.log("edit");
    });
