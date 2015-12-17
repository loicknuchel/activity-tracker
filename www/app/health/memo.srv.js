(function(){
  'use strict';
  angular.module('app')
    .factory('MemoUi', MemoUi);

  function MemoUi(Utils, MemoEditModal){
    return {
      createMemo: createMemo,
      editMemo: editMemo
    };
    
    function createMemo(){
      return MemoEditModal.open({
        title: _generateMemoName(),
        custom: {
          meal: {}
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
      return MemoEditModal.open(memo).then(function(updatedMemo){
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
  }
})();
