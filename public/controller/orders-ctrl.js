angular.module('myApp')
    .controller('ordersCtrl', function($scope, $http, $location, $sessionStorage, $rootScope, $localStorage, $route, Services) {

        $scope.totalPrice = 0;
        $scope.allCustomerPrice = [];
        $http.get('/customers').then(function(response) {

            $scope.customerDetails = response.data.customerDetails;
            angular.forEach($scope.customerDetails, function(val, key) {

                $scope.totalPrice = 0;
                angular.forEach(val.productDetails, function(vals, keys) {

                    var price = vals.Total;
                    $scope.totalPrice = parseInt($scope.totalPrice) + parseFloat(price.substr(1));
                });
                $scope.allCustomerPrice.push($scope.totalPrice);
            });
        });
    });
