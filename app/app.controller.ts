angular.module('app').controller('appController', appController);

function appController($scope: any) {
    var vm = this;

    $scope.hello = 'Hello World!';

    vm.log  = function() {
        console.log(vm.codeInput);
    }
}