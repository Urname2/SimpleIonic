angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {
    $scope.takePicture = function () {
        navigator.vibrate(1000);
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

.controller('Colors', function ($scope) {

    var shake = (
      function () {
          var shake = {},
              watchId = null,
              options = { frequency: 300 },
              previousAcceleration = { x: null, y: null, z: null },
              shakeCallBack = null;

          // Start watching the accelerometer for a shake gesture
          shake.startWatch = function (onShake) {
              if (onShake) {
                  shakeCallBack = onShake;
              }
              watchId = navigator.accelerometer.watchAcceleration(getAccelerationSnapshot, handleError, options);
          };

          // Stop watching the accelerometer for a shake gesture
          shake.stopWatch = function () {
              if (watchId !== null) {
                  navigator.accelerometer.clearWatch(watchId);
                  watchId = null;
              }
          };

          // Gets the current acceleration snapshot from the last accelerometer watch
          function getAccelerationSnapshot() {
              navigator.accelerometer.getCurrentAcceleration(assessCurrentAcceleration, handleError);
          }

          // Assess the current acceleration parameters to determine a shake
          function assessCurrentAcceleration(acceleration) {
              var accelerationChange;
              if (previousAcceleration !== null) {
                  accelerationChange = Math.abs(Math.round(Math.abs(previousAcceleration.x) - Math.abs(acceleration.x))) + Math.abs(Math.round(Math.abs(previousAcceleration.y) - Math.abs(acceleration.y))) + Math.abs(Math.round(Math.abs(previousAcceleration.z) - Math.abs(acceleration.z)));
              }

              // Shake detected :
              if (accelerationChange > 20) {
                  if (typeof (shakeCallBack) === "function") {
                      shakeCallBack();
                  }

                  shake.stopWatch();

                  setTimeout(shake.startWatch, 1000);

                  previousAcceleration = {
                      x: null,
                      y: null,
                      z: null
                  }
              }
              else {
                  previousAcceleration = {
                      x: acceleration.x,
                      y: acceleration.y,
                      z: acceleration.z
                  }
              }
          }

          // Handle errors here
          function handleError() {
              console.log('Something is wrong!')
          }

          return shake;
      }

    )
    ();

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    shake.startWatch(onShake);

    function onShake() {
        console.log('Oh yeah, you shook it !');
        var background = document.getElementById('colors');
        background.style.backgroundColor = getRandomColor();
    }

    
    
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
