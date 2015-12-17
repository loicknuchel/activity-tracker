(function(){
  'use strict';
  angular.module('app')
    .controller('MemoCtrl', MemoCtrl);

  function MemoCtrl($state, $scope, $stateParams, MemoUi, GalleryModal, UiUtils, Storage){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    $scope.$on('$ionicView.enter', function(){
      Storage.getMemo($stateParams.id).then(function(memo){
        data.memo = memo;
      });
    });

    fn.showGallery = function(index){
      GalleryModal.open(data.memo.pictures, index);
    };
    fn.editMemo = function(){
      MemoUi.editMemo(data.memo).then(function(memo){
        Storage.setMemo(memo).then(function(){
          data.memo = memo;
        });
      });
    };
    fn.removeMemo = function(){
      UiUtils.confirm('Supprimer la note ?').then(function(){
        Storage.removeMemo($stateParams.id).then(function(){
          $state.go('app.health.memos');
        });
      });
    };
  }
})();
