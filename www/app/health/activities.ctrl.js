(function(){
  'use strict';
  angular.module('app')
    .controller('ActivitiesCtrl', ActivitiesCtrl);

  function ActivitiesCtrl($scope, ActivityUi, Storage){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.$on('$ionicView.enter', function(){
      updateActivities();
    });

    fn.refreshActivities = function(){
      updateActivities();
    };
    fn.createActivity = function(){
      ActivityUi.createActivity().then(function(activity){
        Storage.setActivity(activity).then(function(){
          updateActivities();
        });
      });
    };

    function updateActivities(){
      Storage.getActivities().then(function(activities){
        data.activities = activities;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  }
})();
