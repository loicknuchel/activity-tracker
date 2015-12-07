(function(){
  'use strict';
  angular.module('app')
    .controller('ActivityCtrl', ActivityCtrl);

  function ActivityCtrl($scope, $stateParams, Storage){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.$on('$ionicView.enter', function(){
      Storage.getActivity($stateParams.id).then(function(activity){
        data.activity = activity;
      });
    });

    fn.createActivity = function(){
      alert('TODO: createActivity');
    };
  }
})();
