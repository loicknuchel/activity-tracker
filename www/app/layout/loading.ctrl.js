(function(){
  'use strict';
  angular.module('app')
    .controller('LoadingCtrl', LoadingCtrl);

  function LoadingCtrl($state, $ionicHistory, Storage){
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    Storage.getMemos().then(function(memos){
      $state.go('app.health.memos');
    });
  }
})();
