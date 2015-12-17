(function(){
  'use strict';
  angular.module('app')
    .factory('GalleryModal', GalleryModal);

  function GalleryModal($rootScope, $q, $ionicModal, UiUtils, ModalTmpl, CameraPlugin, FileTransferPlugin, FilePlugin){
    return {
      open: open
    };

    function open(pictures, index){
      var scope = $rootScope.$new(true);
      var data = {}, fn = {}, defer = $q.defer();
      scope.data = data;
      scope.fn = fn;
      data.pictures = pictures;
      if(index){ data.index = index; }
      fn.cancel = function(){
        scope.modal.hide().then(function(){
          return scope.modal.remove();
        }).then(function(){
          defer.reject();
        });
      };
      $ionicModal.fromTemplateUrl(ModalTmpl.gallery, {
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
