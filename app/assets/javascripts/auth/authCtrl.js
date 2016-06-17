angular.module('RailsAngularSkeleton')
    .controller('AuthCtrl', ['$scope', '$state', 'Auth', function($scope, $state, Auth){

        Auth.currentUser().then(function (){
            $state.go('home');
        });

        $scope.login = function() {
            Auth.login($scope.user).then(function(){
                $state.go('home');
            });
        };

        $scope.register = function() {
            Auth.register($scope.user).then(function(){
                $state.go('home');
            }).catch(function(err) {
                console.log(err);
            });
        };

        }]);
