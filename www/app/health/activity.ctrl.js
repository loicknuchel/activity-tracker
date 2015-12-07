(function(){
  'use strict';
  angular.module('app')
    .controller('ActivityCtrl', ActivityCtrl);

  function ActivityCtrl($scope, $stateParams, ActivityUi, Storage){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.$on('$ionicView.enter', function(){
      Storage.getActivity($stateParams.id).then(function(activity){
        data.activity = activity;
      });
    });

    fn.editActivity = function(){
      ActivityUi.editActivity(data.activity).then(function(activity){
        Storage.setActivity(activity).then(function(){
          data.activity = activity;
        });
      });
    };
  }
})();
