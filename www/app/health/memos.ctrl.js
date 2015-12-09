(function(){
  'use strict';
  angular.module('app')
    .controller('MemosCtrl', MemosCtrl);

  function MemosCtrl($scope, MemoUi, Storage){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.$on('$ionicView.enter', function(){
      updateMemos();
    });

    fn.refreshMemos = function(){
      updateMemos();
    };
    fn.createMemo = function(){
      MemoUi.createMemo().then(function(memo){
        Storage.setMemo(memo).then(function(){
          updateMemos();
        });
      });
    };

    function updateMemos(){
      Storage.getMemos().then(function(memos){
        data.memos = memos;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(){
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  }
})();
