angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {
    $scope.takePicture = function () {
        navigator.vibrate(100);
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
        });
    }

    function onSuccess(img) {
        var image = document.getElementById('myImage');
        console.log(img);
        image.src = "data:image/jpeg;base64," + img;
    }

    function onFail(error) {
        console.log(error)
    }
})

.controller('Colors', function($scope, Chats) {

    function onSuccess(acceleration) {
        console.log(acceleration.x, acceleration.y, acceleration.z);
    }

    function onError() {
        alert('onError!');
    }

    navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
    
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
