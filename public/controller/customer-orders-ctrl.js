angular.module('myApp')
    .controller('customerOrdersCtrl', function($scope, $http, $location, $sessionStorage, $rootScope, $localStorage, $route, Services) {

        $scope.totalPrice = 0;

        $scope.customer = Services.getCustomer();
        angular.forEach($scope.customer.productDetails, function(val, key) {

            var price = val.Total;
            $scope.totalPrice = parseInt($scope.totalPrice) + parseInt(price.substr(1));
        });

        //     $http.post('/customers/details',$scope.customer).then(function(response){

        //      $scope.order=response.data;
        //      console.log($scope.productDetails);
        // });
    });
