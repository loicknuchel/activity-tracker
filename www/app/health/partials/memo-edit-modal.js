(function(){
  'use strict';
  angular.module('app')
    .factory('MemoEditModal', MemoEditModal);

  function MemoEditModal($rootScope, $q, $ionicModal, UiUtils, ModalTmpl, CameraPlugin, FileTransferPlugin, FilePlugin){
    return {
      open: open
    };

    function open(defaultMemo){
      var scope = $rootScope.$new(true);
      var data = {}, fn = {}, defer = $q.defer();
      scope.data = data;
      scope.fn = fn;
      data.memo = angular.copy(defaultMemo);
      fn.addPicture = function(){
        UiUtils.showOptions([{text: 'depuis la librairie', camera: false}, {text: 'depuis la caméra', camera: true}], 'Ajouter une photo').then(function(choice){
          if(choice.camera){
            return CameraPlugin.takePicture();
          } else {
            return CameraPlugin.findPicture();
          }
        }).then(function(pictureUri){
          var path = 'memo/'+Date.now()+'.jpg';
          return FileTransferPlugin.download(pictureUri, cordova.file.dataDirectory+path).then(function(pictureEntry){
            return {
              date: Date.now(),
              path: path
            };
          });
        }).then(function(picture){
          if(!data.memo.pictures){ data.memo.pictures = []; }
          data.memo.pictures.push(picture);
        });
      };
      fn.removePicture = function(picture){
        UiUtils.confirm('Supprimer la photo ?').then(function(){
          FilePlugin.removeFile(picture.path).then(function(){
            data.memo.pictures.splice(data.memo.pictures.indexOf(picture), 1);
          }, function(err){
            UiUtils.showToast('Unable to remove picture <'+picture.path+'>: '+JSON.stringify(err));
          });
        });
      };
      fn.cancel = function(){
        scope.modal.hide().then(function(){
          return scope.modal.remove();
        }).then(function(){
          defer.reject();
        });
      };
      fn.save = function(){
        scope.modal.hide().then(function(){
          return scope.modal.remove();
        }).then(function(){
          defer.resolve(angular.copy(data.memo));
        });
      };
      $ionicModal.fromTemplateUrl(ModalTmpl.memoEdit, {
        scope: scope,
        animation: 'slide-in-up'
      }).then(function(modal){
        scope.modal = modal;
        scope.modal.show();
      });
      return defer.promise;
    }
  }
})();
