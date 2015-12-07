(function(){
  'use strict';
  angular.module('app')
    .controller('SettingsCtrl', SettingsCtrl);

  function SettingsCtrl($scope){
    var data = {};
    $scope.data = data;
  }
})();
