(function(){
  'use strict';
  angular.module('app')
    .controller('ActivitiesCtrl', ActivitiesCtrl);

  function ActivitiesCtrl($scope, Storage){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.$on('$ionicView.enter', function(){
      Storage.getActivities().then(function(activities){
        data.activities = activities;
      });
    });

    fn.refreshActivities = function(){
      Storage.getActivities().then(function(activities){
        data.activities = activities;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    };
    fn.createActivity = function(){
      alert('TODO: createActivity');
    };
  }
})();
