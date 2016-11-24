angular.module('app', []);

angular.module('app').controller('testController', testController);

function testController($scope) {
    $scope.hello = 'helloMsg';
}