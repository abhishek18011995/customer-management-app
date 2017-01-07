angular.module('myApp')
    .controller('customerCtrl', function($scope, $http, $location, $sessionStorage, $rootScope, $localStorage, $route,Services) {

        $scope.customers = [];
        var order;
        $scope.cardDisplay = true;
        $scope.contentsPerPage = 4;
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

        $scope.searched = function() {
            $scope.search = $sessionStorage.search;
        };

        $scope.searched();

        $scope.editCustomer = function(customer) {

            $sessionStorage.customer = customer;
            // console.log($sessionStorage.customer);
            $location.path('/customers/editCustomer');

        }

        $scope.deleteCustomer=Services.deleteCustomer; //delete factory
        $scope.customerOrder=Services.setCustomer;//for sharing customer to different controllers
    });
