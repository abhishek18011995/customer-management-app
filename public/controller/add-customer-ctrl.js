angular.module('myApp')
    .controller('addCustomerCtrl', function($scope, $http, $location, $localStorage, $rootScope, $sessionStorage) {

    	$sessionStorage.search="";

        $scope.addCustomer = function() {


            if ($scope.newCustomer.gender == "male") {
                $scope.newCustomer.pic = "images/male.png";
                // console.log($scope.newCustomer);
            } else if($scope.newCustomer.gender == "female"){
                $scope.newCustomer.pic = "images/female.png";
            }


            $http.post('/addCustomer', $scope.newCustomer).then(function(response) {

            	$location.path('/customers/cardView');
            });
        };

        $scope.cancel=function(){

        	$location.path('/customers/cardView');
        }
    });
