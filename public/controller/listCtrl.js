angular.module('myApp')
    .controller('listCtrl', function($scope, $http, $location, $sessionStorage, $rootScope, $localStorage, Services) {

        $scope.customers = [];
        $scope.listDisplay = true;
        $scope.search = $sessionStorage.search;
        // $rootScope.logged = $localStorage.logged;

        $http.get('/customers').then(function(response) {

            $scope.customerDetails = response.data;
            angular.forEach($scope.customerDetails.customerDetails, function(val, key) {

                order = 0;
                angular.forEach(val.productDetails, function(vals, keys) {

                    if (vals) {
                        order = order + 1;
                    }
                });

                val.order = order;
                $scope.customers.push(val);
            });
        });

        $scope.searching = function() {

            $sessionStorage.search = $scope.search;
            console.log($sessionStorage.search);
        };

        $scope.deleteCustomer = Services.deleteCustomer; //delete factory
        $scope.customerOrder=Services.setCustomer;//for sharing customer to different controllers
    });
