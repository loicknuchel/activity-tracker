(function(){
  'use strict';
  angular.module('app')
    .factory('MemoUi', MemoUi);

  function MemoUi($rootScope, $q, $ionicModal, Utils, ModalTmpl){
    return {
      createMemo: createMemo,
      editMemo: editMemo
    };
    
    function createMemo(){
      return _showMemoModal({
        title: _generateMemoName(),
        custom: {
          meal: {
            alone: false,
            screen: false,
            hungerBefore: 1,
            satietyAfter: 10,
            fulfilmentAfter: 1
          }
        }
      }).then(function(memo){
        memo.id = Utils.createUuid();
        memo.date = Date.now();
        memo.created = Date.now();
        memo.updated = Date.now();
        // TODO add location
        return memo;
      });
    }
    
    function editMemo(memo){
      return _showMemoModal(memo).then(function(updatedMemo){
        updatedMemo.updated = Date.now();
        return updatedMemo;
      });
    }

    function _generateMemoName(){
      var date = new Date();
      var hours = date.getHours();
      var suffix = hours < 11 ? 'Matin' : (hours < 15 ? 'Midi' : 'Soir');
      return moment().format('DD/MM')+' '+suffix;
    }

    function _showMemoModal(memo){
      var defer = $q.defer();
      var scope = $rootScope.$new(true);
      var data = {}, fn = {};
      scope.data = data;
      scope.fn = fn;
      data.memo = angular.copy(memo);
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
