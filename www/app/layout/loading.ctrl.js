(function(){
  'use strict';
  angular.module('app')
    .controller('LoadingCtrl', LoadingCtrl);

  function LoadingCtrl($state, $ionicHistory, Storage){
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    Storage.getActivities().then(function(activities){
      $state.go('app.health.activities');
    });
  }
})();
